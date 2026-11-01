import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type EventItem = {
    _id: string;
    title: string;
    description: string;
    type: string;
    thumbnail: string;
    location: string;
    date: string;
};

// Days between today and the event date (0 = today, negative = already passed)
function getDaysLeft(date: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDay = new Date(date + "T00:00:00");
    return Math.round((eventDay.getTime() - today.getTime()) / 86400000);
}

function daysLeftText(days: number) {
    if (days < 0) return "Ended";
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `In ${days} days`;
}

async function getEvents(): Promise<EventItem[] | null> {
    try {
        const res = await fetch("http://localhost:5000/upcoming-events", {
            cache: "no-store", // always fresh, so new events show up right away
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

function EventCard({ event }: { event: EventItem }) {
    const d = new Date(event.date + "T00:00:00");
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();

    return (
        <Card className="group gap-0 overflow-hidden rounded-3xl border-2 border-[#007a71]/20 p-0 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:-rotate-1">
            {/* Photo */}
            <div className="relative h-52 overflow-hidden bg-[#04302d]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Tilted date stamp */}
                <div className="absolute left-4 top-4 -rotate-6 rounded-xl bg-[#FDEB9E] px-3 py-2 text-center text-[#04302d] shadow-lg">
                    <p className="text-2xl font-extrabold leading-none">{day}</p>
                    <p className="text-[11px] font-bold tracking-widest">{month}</p>
                </div>

                {/* Countdown */}
                <Badge className="absolute right-4 top-4 bg-[#04302d]/80 text-white backdrop-blur">
                    {daysLeftText(getDaysLeft(event.date))}
                </Badge>
            </div>

            {/* Ticket tear line with side notches */}
            <div className="relative py-px">
                <span className="absolute left-0 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4f7f6]" />
                <span className="absolute right-0 top-1/2 h-6 w-6 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4f7f6]" />
                <Separator className="mx-6 w-auto border-t-2 border-dashed border-[#007a71]/30 bg-transparent" />
            </div>

            <CardHeader className="gap-2 pt-5">
                <Badge
                    variant="secondary"
                    className="w-fit bg-[#007a71]/10 uppercase tracking-widest text-[#007a71]"
                >
                    {event.type}
                </Badge>
                <CardTitle className="line-clamp-1 text-xl text-[#04302d]">
                    {event.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                    {event.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-3">
                <p className="flex items-center gap-2 text-sm font-medium text-[#007a71]">
                    <MapPin size={16} />
                    <span className="line-clamp-1">{event.location}</span>
                </p>
            </CardContent>

            <CardFooter className="pb-6 pt-4">
                <Button
                    nativeButton={false}
                    render={<Link href={`/upcoming-events/${event._id}`} />}
                    className="h-11 w-full gap-2 rounded-full bg-[#04302d] text-white hover:bg-[#007a71]"
                >
                    View Event
                    <ArrowRight size={16} />
                </Button>
            </CardFooter>
        </Card>
    );
}

export default async function UpcomingEventsPage() {
    const data = await getEvents();

    // Safety net: never show events whose date has passed
    const events = (data ?? [])
        .filter((e) => getDaysLeft(e.date) >= 0)
        .sort((a, b) => a.date.localeCompare(b.date));

    return (
        <div className="mx-auto max-w-7xl px-5 py-12">
            {/* Back to homepage, in cursive (shown once, at the top) */}
            <Link
                href="/"
                style={{ fontFamily: "'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive" }}
                className="group mb-8 inline-flex items-center gap-2 text-2xl text-[#007a71] transition-colors hover:text-[#04302d]"
            >
                <ArrowLeft
                    size={20}
                    className="transition-transform group-hover:-translate-x-1"
                />
                Back to Homepage
            </Link>

            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-[#04302d] sm:text-5xl">
                    Upcoming Events<span className="text-[#f4b942]">.</span>
                </h1>
                <p className="mt-3 text-muted-foreground">
                    Grab your ticket and join something good.
                </p>
            </div>

            {data === null ? (
                <p className="py-20 text-center text-muted-foreground">
                    Couldn&apos;t load events right now. Please try again later.
                </p>
            ) : events.length === 0 ? (
                <p className="py-20 text-center text-muted-foreground">
                    No upcoming events yet. Be the first to create one!
                </p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
}