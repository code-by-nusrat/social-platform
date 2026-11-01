import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ArrowLeft, CalendarPlus, Ticket } from "lucide-react";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MyEventsList, { type MyEvent } from "@/components/manage-event/MyEventList";

const cursive = {
    fontFamily: "'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive",
};

async function getMyEvents(email: string): Promise<MyEvent[] | null> {
    try {
        const res = await fetch(
            `http://localhost:5000/my-events/${encodeURIComponent(email)}`,
            { cache: "no-store" }
        );
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    // private page: not logged in -> go to login
    if (!user) redirect("/login");

    const events = await getMyEvents(user.email);

    return (
        <div className="mx-auto max-w-7xl px-5 py-12">
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
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
                <p style={cursive} className="text-2xl text-[#007a71]">
                    {user.name}&apos;s
                </p>
                <h1 className="text-4xl font-extrabold tracking-tight text-[#04302d] sm:text-5xl">
                    Manage Events<span className="text-[#f4b942]">.</span>
                </h1>
                {events && events.length > 0 && (
                    <Badge className="bg-[#FDEB9E] text-[#04302d]">
                        {events.length} created
                    </Badge>
                )}
            </div>

            {events === null ? (
                <p className="py-20 text-center text-muted-foreground">
                    Couldn&apos;t load your events right now. Please try again later.
                </p>
            ) : events.length === 0 ? (
                <Card className="rounded-3xl border-2 border-dashed border-[#007a71]/30 py-0">
                    <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
                        <Ticket size={40} className="text-[#007a71]" />
                        <p className="text-lg font-semibold text-[#04302d]">
                            You haven&apos;t created any events yet.
                        </p>
                        <Button
                            nativeButton={false}
                            render={<Link href="/create-event" />}
                            className="gap-2 rounded-full bg-[#04302d] px-8 text-white hover:bg-[#007a71]"
                        >
                            <CalendarPlus size={16} />
                            Create an Event
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <MyEventsList events={events} email={user.email} />
            )}
        </div>
    );
};

export default page;