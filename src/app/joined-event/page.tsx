// // import { auth } from '@/lib/auth';
// // import { headers } from 'next/headers';
// // import React from 'react';

// // const page = async() => {
// //     const session =await auth.api.getSession({
// //         headers:await headers(),
// //     })
// //     const user =session?.user
// //     console.log(user)
// //     const res =await fetch(`http://localhost:5000/joined-event/${user?.email}`)
// //     const joining =await res.json()
// //     console.log(joining)
// //     return (
// //         <div>
// //             join events
// //         </div>
// //     );
// // };

//export default page

import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ArrowLeft, ArrowRight, CalendarCheck, CalendarDays, MapPin, Ticket } from "lucide-react";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type JoinedEvent = {
    _id: string; // id of the join record
    eventId: string; // id of the event
    title: string;
    description?: string;
    type: string;
    thumbnail: string;
    location: string;
    date: string; // event date, YYYY-MM-DD
};

const cursive = {
    fontFamily: "'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive",
};

// Days between today and the event date (0 = today, negative = already passed)
function getDaysLeft(date: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDay = new Date(date + "T00:00:00");
    return Math.round((eventDay.getTime() - today.getTime()) / 86400000);
}

async function getJoinedEvents(email: string): Promise<JoinedEvent[] | null> {
    try {
        const res = await fetch(
            `http://localhost:5000/joined-event/${encodeURIComponent(email)}`,
            { cache: "no-store" }
        );
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

function StatCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
}) {
    return (
        <Card className="rounded-2xl border-2 border-[#007a71]/20 py-0 shadow-sm">
            
            <CardContent className="flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#007a71]/10 text-[#007a71]">
                    {icon}
                </span>
                <div>
                    <p className="text-3xl font-extrabold leading-none text-[#04302d]">
                        {value}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {label}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function SectionTitle({ title, count }: { title: string; count: number }) {
    return (
        <div className="mb-6 flex items-center gap-3">
            
            <h2 style={cursive} className="text-3xl text-[#04302d]">
                {title}
            </h2>
            <Badge className="bg-[#FDEB9E] text-[#04302d]">{count}</Badge>
            <Separator className="flex-1 bg-[#007a71]/20" />
        </div>
    );
}

function JoinedCard({ item, past }: { item: JoinedEvent; past: boolean }) {
    const d = new Date(item.date + "T00:00:00");
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const weekday = d.toLocaleString("en-US", { weekday: "long" });
    const year = d.getFullYear();
    const left = getDaysLeft(item.date);

    // barcode bars come from the event id, so every ticket looks different
    const bars = Array.from(String(item.eventId ?? item._id)).map(
        (c) => (c.charCodeAt(0) % 3) + 1
    );

    return (
        <div className="relative">
            
            {/* timeline dot */}
            <span
                className={`absolute -left-10 top-16 hidden h-4 w-4 rounded-full border-4 border-[#f4f7f6] sm:block ${
                    past ? "bg-[#04302d]/40" : "bg-[#007a71]"
                }`}
            />

            <Card className="group gap-0 overflow-hidden rounded-3xl border-2 border-[#007a71]/25 bg-white p-0 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl md:min-h-80 md:flex-row">
                {/* 1. PHOTO with a diagonal edge */}
                <div className="relative h-60 shrink-0 overflow-hidden bg-[#04302d] md:h-auto md:w-80 md:-mr-12 md:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                            past ? "grayscale" : ""
                        }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04302d]/80 via-transparent to-transparent" />

                    {/* tilted date sticker */}
                    <div className="absolute left-5 top-5 -rotate-6 rounded-2xl bg-[#FDEB9E] px-4 py-3 text-center text-[#04302d] shadow-xl">
                        <p className="text-4xl font-extrabold leading-none">{day}</p>
                        <p className="mt-1 text-xs font-bold tracking-[0.25em]">{month}</p>
                        <p className="text-[10px] font-semibold opacity-60">{year}</p>
                    </div>

                    {/* weekday label */}
                    <p className="absolute bottom-4 left-5 text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
                        {weekday}
                    </p>

                    {past && (
                        <span className="absolute inset-0 flex items-center justify-center">
                            <span className="-rotate-12 rounded-md border-4 border-[#FDEB9E] px-4 py-1 text-2xl font-extrabold uppercase tracking-widest text-[#FDEB9E]">
                                Attended
                            </span>
                        </span>
                    )}
                </div>

                {/* 2. MAIN DETAILS */}
                <CardContent className="flex flex-1 flex-col justify-between gap-6 p-7 md:pl-16">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge className="bg-[#04302d] uppercase tracking-widest text-[#FDEB9E]">
                                {item.type}
                            </Badge>
                            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#007a71]">
                                Admit one
                            </span>
                        </div>

                        <h3 className="line-clamp-2 text-2xl font-extrabold leading-tight text-[#04302d] sm:text-3xl">
                            {item.title}
                        </h3>

                        {item.description && (
                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                {item.description}
                            </p>
                        )}

                        <Separator className="bg-[#007a71]/15" />

                        {/* info rows with icon chips */}
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007a71]/10 text-[#007a71]">
                                    <CalendarDays size={18} />
                                </span>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                        Date
                                    </p>
                                    <p className="text-sm font-semibold text-[#04302d]">
                                        {d.toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007a71]/10 text-[#007a71]">
                                    <MapPin size={18} />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                                        Location
                                    </p>
                                    <p className="line-clamp-1 text-sm font-semibold text-[#04302d]">
                                        {item.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                        nativeButton={false}
                        render={<Link href={`/upcoming-events/${item.eventId}`} />}
                        className="h-11 w-full gap-2 rounded-full bg-[#04302d] text-white hover:bg-[#007a71] sm:w-fit sm:px-8"
                    >
                        View Event
                        <ArrowRight size={16} />
                    </Button>
                </CardContent>

                {/* 3. TICKET STUB with perforation, notches and barcode */}
                <div className="relative flex shrink-0 flex-row items-center justify-between gap-4 border-t-2 border-dashed border-[#007a71]/30 bg-[#f4f7f6] px-6 py-5 md:w-44 md:flex-col md:justify-center md:gap-5 md:border-l-2 md:border-t-0">
                    {/* notches */}
                    <span className="absolute left-0 top-0 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4f7f6] ring-2 ring-[#007a71]/25 md:block" />
                    <span className="absolute bottom-0 left-0 hidden h-7 w-7 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#f4f7f6] ring-2 ring-[#007a71]/25 md:block" />

                    {/* countdown */}
                    <div className="text-center">
                        {past ? (
                            <>
                                <p className="text-4xl font-extrabold leading-none text-[#04302d]/60">
                                    ✓
                                </p>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                                    Done
                                </p>
                            </>
                        ) : left === 0 ? (
                            <>
                                <p className="text-3xl font-extrabold leading-none text-[#007a71]">
                                    TODAY
                                </p>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                                    Happening
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-5xl font-extrabold leading-none text-[#007a71]">
                                    {left}
                                </p>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                                    {left === 1 ? "Day left" : "Days left"}
                                </p>
                            </>
                        )}
                    </div>

                    {/* barcode */}
                    <div className="flex h-14 items-stretch justify-center gap-[2px]">
                        {bars.slice(0, 24).map((w, i) => (
                            <span
                                key={i}
                                style={{ width: w * 2 }}
                                className={past ? "bg-[#04302d]/40" : "bg-[#04302d]"}
                            />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    // private page: not logged in -> go to login
    if (!user) redirect("/login");

    const data = await getJoinedEvents(user.email);

    // sort by event date (nearest first)
    const events = (data ?? [])
        .filter((e) => e.date)
        .sort((a, b) => a.date.localeCompare(b.date));

    const upcoming = events.filter((e) => getDaysLeft(e.date) >= 0);
    // past events: most recent first
    const past = events.filter((e) => getDaysLeft(e.date) < 0).reverse();

    return (
        <div className="mx-auto max-w-6xl px-5 py-12">
             <Link
                            href="/"
                            style={cursive}
                            className="group mb-10 inline-flex items-center gap-2 text-2xl text-[#007a71] transition-colors hover:text-[#04302d]"
                        >
                            <ArrowLeft
                                size={20}
                                className="transition-transform group-hover:-translate-x-1"
                            />
                            Back to Homepage
                        </Link>
            {/* header */}
            <div className="mb-10 flex flex-col items-center gap-4 text-center">
                <Avatar className="h-20 w-20 border-4 border-[#FDEB9E] shadow-lg">
                    <AvatarImage src={user.image ?? undefined} alt={user.name} />
                    <AvatarFallback className="bg-[#007a71] text-2xl font-bold text-white">
                        {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p style={cursive} className="text-2xl text-[#007a71]">
                        {user.name}&apos;s
                    </p>
                    <h1 className="text-4xl font-extrabold tracking-tight text-[#04302d] sm:text-5xl">
                        Joined Events<span className="text-[#f4b942]">.</span>
                    </h1>
                </div>
            </div>

            {/* stats */}
            <div className="mb-14 grid gap-4 sm:grid-cols-3">
                <StatCard icon={<Ticket size={24} />} label="Total joined" value={events.length} />
                <StatCard icon={<CalendarDays size={24} />} label="Coming up" value={upcoming.length} />
                <StatCard icon={<CalendarCheck size={24} />} label="Attended" value={past.length} />
            </div>

            {data === null ? (
                <p className="py-20 text-center text-muted-foreground">
                    Couldn&apos;t load your events right now. Please try again later.
                </p>
            ) : events.length === 0 ? (
                <Card className="rounded-3xl border-2 border-dashed border-[#007a71]/30 py-0">
                    <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
                        <Ticket size={40} className="text-[#007a71]" />
                        <p className="text-lg font-semibold text-[#04302d]">
                            You haven&apos;t joined any events yet.
                        </p>
                        <Button
                            nativeButton={false}
                            render={<Link href="/upcoming-events" />}
                            className="rounded-full bg-[#04302d] px-8 text-white hover:bg-[#007a71]"
                        >
                            Browse Upcoming Events
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-14">
                    {upcoming.length > 0 && (
                        <section>
                            <SectionTitle title="Coming up" count={upcoming.length} />
                            <div className="relative space-y-8 sm:pl-10 sm:before:absolute sm:before:bottom-2 sm:before:left-[7px] sm:before:top-2 sm:before:w-0.5 sm:before:bg-[#007a71]/25">
                                {upcoming.map((item) => (
                                    <JoinedCard key={item._id} item={item} past={false} />
                                ))}
                            </div>
                        </section>
                    )}

                    {past.length > 0 && (
                        <section>
                            <SectionTitle title="Already attended" count={past.length} />
                            <div className="relative space-y-8 sm:pl-10 sm:before:absolute sm:before:bottom-2 sm:before:left-[7px] sm:before:top-2 sm:before:w-0.5 sm:before:bg-[#04302d]/15">
                                {past.map((item) => (
                                    <JoinedCard key={item._id} item={item} past />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default page;