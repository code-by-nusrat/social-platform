
"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Joinbtn, { type EventItem } from "@/components/joinbtn/Joinbtn";

const cursive = {
    fontFamily: "'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive",
};

export default function UpcomingEventDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user ?? null;

    const [event, setEvent] = useState<EventItem | null>(null);
    const [loadingEvent, setLoadingEvent] = useState(true);

    const [joining, setJoining] = useState(false);
    const [joined, setJoined] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // Load event details
    const loadEvent = useCallback(async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/upcoming-events/${id}`);

            if (!res.ok) {
                setEvent(null);
                return;
            }

            const data = await res.json();
            setEvent(data?._id ? data : null);
        } catch (error) {
            console.error("Failed to load event:", error);
            setEvent(null);
        } finally {
            setLoadingEvent(false);
        }
    }, [id]);

    useEffect(() => {
        loadEvent();
    }, [loadEvent]);

    // Check whether the user already joined
    useEffect(() => {
        if (!user?.email) {
            setJoined(false);
            return;
        }

        let cancelled = false;

        const checkJoined = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/joined-event/${encodeURIComponent(user.email)}`
                );

                if (!res.ok) return;

                const list = await res.json();

                if (!cancelled && Array.isArray(list)) {
                    setJoined(
                        list.some(
                            (e) =>
                                String(e.eventId) === id ||
                                String(e._id) === id
                        )
                    );
                }
            } catch (error) {
                console.error("Failed to check joined event:", error);
            }
        };

        checkJoined();

        return () => {
            cancelled = true;
        };
    }, [user?.email, id]);

    // Handle joining an event
    const handleJoin = async () => {
        if (isPending) return;

        if (!user?.email) {
            router.push("/login");
            return;
        }

        if (!event?._id || joined || joining) return;

        setJoining(true);
        setMessage("");
        setIsError(false);

        try {
            const res = await fetch(
                "http://localhost:5000/join-event",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        eventId: event._id,
                        email: user.email,
                        name: user.name,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to join event."
                );
            }

            setJoined(true);
            setMessage("Successfully joined this event!");
            setIsError(false);

            await loadEvent();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
            setIsError(true);
        } finally {
            setJoining(false);
        }
    };

    // Loading state
    if (loadingEvent) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-[#007a71]">
                <Loader2 className="animate-spin" size={36} />
            </div>
        );
    }

    // Event not found
    if (!event) {
        return (
            <div className="py-24 text-center">
                <p className="mb-4 text-lg text-[#04302d]">
                    Event not found.
                </p>

                <Button
                    nativeButton={false}
                    render={<Link href="/upcoming-events" />}
                >
                    Back to Upcoming Events
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-5 py-10">
            {/* Back to homepage */}
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

            <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">

                {/* LEFT: Polaroid + About */}
                <div className="space-y-10">
                    <div className="relative mx-auto w-full max-w-md -rotate-2 bg-white p-4 pb-16 shadow-2xl transition-transform duration-300 hover:rotate-0">

                        {/* Tape */}
                        <span className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 rotate-3 bg-[#FDEB9E]/80 shadow" />

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={event.thumbnail}
                            alt={event.title}
                            className="aspect-square w-full bg-[#04302d] object-cover"
                        />

                        <p
                            style={cursive}
                            className="absolute inset-x-0 bottom-4 line-clamp-1 px-4 text-center text-2xl text-[#04302d]"
                        >
                            {event.title}
                        </p>
                    </div>

                    {/* About Event */}
                    <Card className="rounded-3xl border-2 border-[#007a71]/20 shadow-lg">
                        <CardContent>
                            <h2 className="mb-3 text-2xl font-bold text-[#04302d]">
                                About this event
                                <span className="text-[#f4b942]">.</span>
                            </h2>

                            <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                                {event.description}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT: Join Event Ticket */}
                <Joinbtn
                    event={event}
                    user={user}
                    isPending={isPending}
                    joining={joining}
                    joined={joined}
                    message={message}
                    isError={isError}
                    onJoin={handleJoin}
                />
            </div>
        </div>
    );
}
