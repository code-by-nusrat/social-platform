"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

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
  const [submitting, setSubmitting] = useState(false);

  // Only allow event dates from tomorrow onwards
  const tomorrow = new Date(
    Date.now() + 86400000
  ).toLocaleDateString("en-CA");

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle event creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    setError("");

    if (isPending) return;

    if (!user) {
      toast.error("Please log in to create an event.");
      return;
    }

    // Validate all fields
    if (Object.values(form).some((value) => !value.trim())) {
      toast.error("Please fill in every field.");
      return;
    }

    // Validate event date
    if (form.date < tomorrow) {
      toast.error("Event date must be in the future.");
      return;
    }

    setSubmitting(true);

    try {
      // Get JWT token from Better Auth
      const token = await getTokenFromClient();

      if (!token) {
        throw new Error(
          "Authentication token not found. Please log in again."
        );
      }

      // Send event data to backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          creatorEmail: user.email,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message ||
          data.error ||
          "Could not create the event."
        );
      }

      // Show success message
      toast.success("🎉 Event created successfully!");

      // Redirect to Upcoming Events after 2 seconds
      setTimeout(() => {
        router.push("/upcoming-events");
      }, 2000);

    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      setError(message);
      toast.error(message);
      setSubmitting(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium text-[#007a71]">
          Loading...
        </p>
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

          <CardDescription>
            Hosting as {user?.email || "Guest"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Event Title */}
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

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description
              </Label>

              <Textarea
                id="description"
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="What is this event about?"
              />
            </div>

            {/* Event Type */}
            <div className="space-y-2">
              <Label>Event type</Label>

              <Select
                value={form.type}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    type: value ?? "",
                  })
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

            {/* Thumbnail URL */}
            <div className="space-y-2">
              <Label htmlFor="thumbnail">
                Thumbnail image URL
              </Label>

              <Input
                id="thumbnail"
                name="thumbnail"
                type="url"
                value={form.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            {/* Location and Date */}
            <div className="grid gap-4 sm:grid-cols-2">

              <div className="space-y-2">
                <Label htmlFor="location">
                  Location
                </Label>

                <Input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Where will it happen?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">
                  Event date
                </Label>

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

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 w-full bg-[#007a71] text-base font-semibold text-white hover:bg-[#04302d]"
            >
              {submitting ? "Creating..." : "Create Event"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
