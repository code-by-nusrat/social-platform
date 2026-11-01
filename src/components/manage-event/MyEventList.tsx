"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CalendarDays, Eye, Loader2, MapPin, Pencil, Trash2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const API = "http://localhost:5000";

export type MyEvent = {
    _id: string;
    title: string;
    description: string;
    type: string;
    thumbnail: string;
    location: string;
    date: string;
    participants?: number;
};

// Days between today and the event date (negative = already passed)
function getDaysLeft(date: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDay = new Date(date + "T00:00:00");
    return Math.round((eventDay.getTime() - today.getTime()) / 86400000);
}

function MyEventCard({ event, email }: { event: MyEvent; email: string }) {
    const router = useRouter();

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [form, setForm] = useState({
        title: event.title,
        type: event.type,
        date: event.date,
        location: event.location,
        thumbnail: event.thumbnail,
        description: event.description,
    });

    const ended = getDaysLeft(event.date) < 0;
    const prettyDate = new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    // reset the form to the saved values every time the dialog opens
    const openEdit = () => {
        setForm({
            title: event.title,
            type: event.type,
            date: event.date,
            location: event.location,
            thumbnail: event.thumbnail,
            description: event.description,
        });
        setEditOpen(true);
    };

    // UPDATE
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`${API}/update-event/${event._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, ...form }),
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                toast.success("Event updated");
                setEditOpen(false);
                router.refresh(); // reload the list from the database
            } else {
                toast.error(data.message || "Could not update the event");
            }
        } catch {
            toast.error("Could not connect to the server");
        } finally {
            setSaving(false);
        }
    };

    // DELETE
    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await fetch(
                `${API}/delete-event/${event._id}?email=${encodeURIComponent(email)}`,
                { method: "DELETE" }
            );
            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                toast.success("Event deleted");
                setDeleteOpen(false);
                router.refresh();
            } else {
                toast.error(data.message || "Could not delete the event");
            }
        } catch {
            toast.error("Could not connect to the server");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <Card className="group gap-0 overflow-hidden rounded-3xl border-2 border-[#007a71]/20 p-0 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                {/* photo */}
                <div className="relative h-48 overflow-hidden bg-[#04302d]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={event.thumbnail}
                        alt={event.title}
                        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                            ended ? "grayscale" : ""
                        }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute left-4 top-4 bg-[#FDEB9E] uppercase tracking-widest text-[#04302d]">
                        {event.type}
                    </Badge>
                    {ended && (
                        <Badge className="absolute right-4 top-4 bg-[#04302d]/80 text-white backdrop-blur">
                            Ended
                        </Badge>
                    )}
                </div>

                {/* details */}
                <CardContent className="space-y-3 p-5">
                    <h3 className="line-clamp-1 text-xl font-bold text-[#04302d]">
                        {event.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {event.description}
                    </p>
                    <div className="space-y-1.5 text-sm font-medium text-[#007a71]">
                        <p className="flex items-center gap-2">
                            <CalendarDays size={16} /> {prettyDate}
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span className="line-clamp-1">{event.location}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <Users size={16} /> {event.participants ?? 0} joined
                        </p>
                    </div>
                </CardContent>

                {/* actions */}
                <CardFooter className="grid grid-cols-3 gap-2 border-t-2 border-dashed border-[#007a71]/20 p-4">
                    <Button
                        nativeButton={false}
                        render={<Link href={`/upcoming-events/${event._id}`} />}
                        variant="outline"
                        className="gap-1.5 rounded-full"
                    >
                        <Eye size={15} /> View
                    </Button>
                    <Button
                        onClick={openEdit}
                        className="gap-1.5 rounded-full bg-[#04302d] text-white hover:bg-[#007a71]"
                    >
                        <Pencil size={15} /> Edit
                    </Button>
                    <Button
                        onClick={() => setDeleteOpen(true)}
                        variant="destructive"
                        className="gap-1.5 rounded-full"
                    >
                        <Trash2 size={15} /> Delete
                    </Button>
                </CardFooter>
            </Card>

            {/* EDIT dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Update event</DialogTitle>
                        <DialogDescription>
                            Change the details and save. Only you can edit this event.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor={`title-${event._id}`}>Title</Label>
                            <Input
                                id={`title-${event._id}`}
                                name="title"
                                value={form.title}
                                onChange={change}
                                required
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor={`type-${event._id}`}>Event type</Label>
                                <Input
                                    id={`type-${event._id}`}
                                    name="type"
                                    value={form.type}
                                    onChange={change}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`date-${event._id}`}>Date</Label>
                                <Input
                                    id={`date-${event._id}`}
                                    name="date"
                                    type="date"
                                    value={form.date}
                                    onChange={change}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`location-${event._id}`}>Location</Label>
                            <Input
                                id={`location-${event._id}`}
                                name="location"
                                value={form.location}
                                onChange={change}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`thumbnail-${event._id}`}>Thumbnail URL</Label>
                            <Input
                                id={`thumbnail-${event._id}`}
                                name="thumbnail"
                                value={form.thumbnail}
                                onChange={change}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor={`description-${event._id}`}>Description</Label>
                            <Textarea
                                id={`description-${event._id}`}
                                name="description"
                                rows={4}
                                value={form.description}
                                onChange={change}
                                required
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving}
                                className="gap-2 bg-[#04302d] text-white hover:bg-[#007a71]"
                            >
                                {saving && <Loader2 size={16} className="animate-spin" />}
                                {saving ? "Saving..." : "Save changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* DELETE confirm dialog */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete this event?</DialogTitle>
                        <DialogDescription>
                            &quot;{event.title}&quot; and everyone&apos;s join records for it will
                            be removed. This can&apos;t be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleting}
                            className="gap-2"
                        >
                            {deleting && <Loader2 size={16} className="animate-spin" />}
                            {deleting ? "Deleting..." : "Yes, delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default function MyEventsList({
    events,
    email,
}: {
    events: MyEvent[];
    email: string;
}) {
    return (
        <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <MyEventCard key={event._id} event={event} email={email} />
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}