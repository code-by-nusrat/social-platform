"use client";

import { useState } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

export type EventItem = {
    _id: string;
    title: string;
    description: string;
    type: string;
    thumbnail: string;
    location: string;
    date: string;
    creatorEmail?: string;
    participants?: number;
};

type JoinbtnProps = {
    event: EventItem;
    user: { email: string; name?: string } | null;
    isPending: boolean;
    joining: boolean;
    joined: boolean;
    message: string;
    isError: boolean;
    onJoin: () => void;
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

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <li className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#007a71]/10 text-[#007a71]">
                {icon}
            </span>
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                </p>
                <p className="font-semibold text-[#04302d]">{value}</p>
            </div>
        </li>
    );
}

const Joinbtn = ({
    event,
    isPending,
    joining,
    joined,
    message,
    isError,
}: JoinbtnProps) => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    // joined count shown on the ticket (goes up when this user joins)
    const [participants, setParticipants] = useState(event.participants ?? 0);

    const left = getDaysLeft(event.date);
    const ended = left < 0;
    const prettyDate = new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const host = event.creatorEmail?.split("@")[0] || "Community member";

    // Barcode bars are generated from the event id, so every ticket looks different
    const bars = Array.from(String(event._id)).map((c) => (c.charCodeAt(0) % 3) + 1);

    const handleJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login to join this event");
            return;
        }

        const joiningDate = event.date;
        const { _id, ...eventData } = event; // take the event's _id out
        const data = {
            ...eventData, // event first
            ...user, // user second, so the user's email wins
            eventId: _id, // keep the event id under another name
            joiningDate: joiningDate,
        };

        try {
            const res = await fetch("http://localhost:5000/joined-event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const joiningRes = await res.json();

            // 409 = this user already joined this event
            if (res.status === 409) {
                toast.info("You already joined this event");
                return;
            }

            if (res.ok) {
                setParticipants((p) => p + 1);
                toast.success("You joined this event!");
                return;
            }

            toast.error(joiningRes.message || "Something went wrong");
        } catch {
            toast.error("Could not connect to the server");
        }
    };

    return (
        <>
            <Card className="gap-0 overflow-hidden rounded-3xl border-2 border-[#007a71] p-0 shadow-xl lg:sticky lg:top-28">
                {/* ticket header */}
                <div className="flex items-center justify-between bg-[#04302d] px-6 py-4">
                    <span className="text-xs font-bold tracking-[0.3em] text-[#FDEB9E]">
                        ADMIT ONE
                    </span>
                    <Badge className="bg-[#FDEB9E] uppercase tracking-widest text-[#04302d]">
                        {event.type}
                    </Badge>
                </div>

                <CardContent className="space-y-6 p-6">
                    <div>
                        <h1 className="text-3xl font-extrabold leading-tight text-[#04302d]">
                            {event.title}
                        </h1>
                        <p className="mt-2 inline-block -rotate-1 rounded-md bg-[#007a71] px-3 py-1 text-sm font-bold text-white">
                            {daysLeftText(left)}
                        </p>
                    </div>

                    <ul className="space-y-5">
                        <InfoRow icon={<CalendarDays size={20} />} label="Date" value={prettyDate} />
                        <InfoRow icon={<MapPin size={20} />} label="Location" value={event.location} />
                        <InfoRow
                            icon={<Users size={20} />}
                            label="Joined"
                            value={`${participants} people`}
                        />
                    </ul>

                    <div className="flex items-center gap-3 rounded-2xl bg-[#f4f7f6] p-3">
                        <Avatar>
                            <AvatarFallback className="bg-[#007a71] font-bold text-white">
                                {host.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                                Hosted by
                            </p>
                            <p className="font-semibold text-[#04302d]">{host}</p>
                        </div>
                    </div>
                </CardContent>

                {/* tear line with notches */}
                <div className="relative py-px">
                    <span className="absolute left-0 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4f7f6]" />
                    <span className="absolute right-0 top-1/2 h-7 w-7 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4f7f6]" />
                    <Separator className="mx-7 w-auto border-t-2 border-dashed border-[#007a71]/30 bg-transparent" />
                </div>

                {/* barcode */}
                <div className="flex h-12 items-stretch justify-center gap-[2px] px-6 pt-6">
                    {bars.map((w, i) => (
                        <span key={i} style={{ width: w * 2 }} className="bg-[#04302d]" />
                    ))}
                </div>

                {/* join section */}
                <div className="p-6">
                    <div className="mb-5 text-center">
                        <h2 className="text-xl font-bold text-[#04302d]">Ready to Join?</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Be part of this amazing event!
                        </p>
                    </div>

                    <Button
                        onClick={handleJoin}
                        disabled={ended || joining || joined || isPending}
                        className="h-12 w-full rounded-xl bg-[#04302d] text-base font-semibold text-white hover:bg-[#007a71]"
                    >
                        {ended
                            ? "This event has ended"
                            : isPending
                            ? "Loading..."
                            : joined
                            ? "✓ Joined"
                            : joining
                            ? "Joining..."
                            : user
                            ? "Join Event"
                            : "Login to Join"}
                    </Button>

                    {!user && !isPending && !ended && (
                        <p className="mt-3 text-center text-xs text-muted-foreground">
                            You need to be logged in to join this event.
                        </p>
                    )}

                    {message && (
                        <Alert
                            variant={isError ? "destructive" : "default"}
                            className={`mt-4 ${
                                isError ? "" : "border-green-300 bg-green-50 text-green-800"
                            }`}
                        >
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </Card>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default Joinbtn;