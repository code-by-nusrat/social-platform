"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Awareness Campaign",
  "Health Camp",
  "Education",
];

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    thumbnail: "",
    location: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Earliest allowed date is tomorrow, so no past date can be picked
  const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString("en-CA");

  // One handler for the inputs and the textarea (each has a "name")
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (Object.values(form).some((v) => !v.trim())) {
      return setError("Please fill in every field.");
    }
    if (form.date < tomorrow) {
      return setError("Event date must be in the future.");
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // The creator's email is saved with the event
      body: JSON.stringify({ ...form, creatorEmail: user?.email }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return setError(data.error || "Could not create the event.");
    }

    setSuccess(true);
    setTimeout(() => router.push("/events"), 1500);
  };

  if (isPending) return null;

  // No middleware: the page protects itself
  if (!user) {
    return (
      <div className="py-24 text-center">
        <p className="mb-4 text-lg">Please log in to create an event.</p>
        <Button render={<Link href="/login" />}>Login</Button>
      </div>
    );
  }

  return (
    <div className="px-5 py-12">
      <Card className="mx-auto max-w-2xl border-2 border-[#007a71] shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#007a71]">
            Create an Event
          </CardTitle>
          <CardDescription>Hosting as {user.email}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Riverside Cleanup Drive"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="What is this event about?"
              />
            </div>

            <div className="space-y-2">
              <Label>Event type</Label>
              <Select
                value={form.type}
                onValueChange={(value) =>
                  setForm({ ...form, type: value ?? "" })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail image URL</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="url"
                value={form.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Where will it happen?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Event date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  min={tomorrow}
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-300 bg-green-50 text-green-800">
                <AlertTitle>Event created successfully!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Taking you to Upcoming Events...
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="h-11 w-full bg-[#007a71] text-base font-semibold text-white hover:bg-[#04302d]"
            >
              Create Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}