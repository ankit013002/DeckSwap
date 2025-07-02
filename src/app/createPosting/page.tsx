// app/createPosting/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import Image from "next/image";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { PopcornIcon } from "lucide-react";

export default function CreatePostingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [image, setimage] = useState("");
  const [priceError, setPriceError] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSelect(name: string, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setForm((f) => ({ ...f, [e.target.name]: dataUrl }));
      setimage(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const regEx = /^[1-9]\d*(?:\.\d{2})?$/;
    if (!regEx.test(value)) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
    setForm((f) => {
      return {
        ...f,
        price: e.target.value,
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/createPosting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create posting");
      router.push("/"); // go back to home or wherever
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold">New Posting</h1>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Item name"
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={form.price}
                onChange={handlePriceChange}
                placeholder="Price of item ($23.45)"
                required
              />
              {priceError && (
                <div className="justify-items-center">
                  <div className="text-red-700">
                    Please only include digits and/or decimals (xx or xx.yy)
                  </div>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your item…"
                rows={4}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(v: string) => handleSelect("category", v)}
                value={form.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="sleeve">Sleeve</SelectItem>
                  <SelectItem value="playmat">Playmat</SelectItem>
                  {/* …add more if you want */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select
                onValueChange={(v: string) => handleSelect("condition", v)}
                value={form.condition}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="NM">NM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              {image && (
                <Image
                  className="w-full justify-self-center"
                  src={image}
                  alt="Image"
                  width={100}
                  height={100}
                />
              )}
              <Input
                type="file"
                id="imageUrl"
                name="imageUrl"
                onChange={handleFileChange}
                placeholder="https://…"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating…" : "Create Posting"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
