"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type ItemType } from "~/server/getProduct";

interface TradeFormProps {
  targetItem: ItemType;
}

type PayloadType = {
  success: boolean;
  status: number;
  data?: ItemType;
  error?: string;
};

export default function TradeForm({ targetItem }: TradeFormProps) {
  const path = usePathname();
  const productId = path.split("/").pop();
  const [product, setProduct] = useState<ItemType>();
  const [moneyOffer, setMoneyOffer] = useState("");
  const [cardOffers, setCardOffers] = useState<string[]>([]);
  const [newCard, setNewCard] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/fetchProduct?product=${productId}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const payload = (await response.json()) as PayloadType;
        console.log(payload.data);
        if (!payload.success) {
          throw new Error(payload.error ?? "Unknown API error");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error: ", error);
        } else {
          console.log("Unknown error: ", error);
        }
      }
    }

    const response = fetchData();
  }, []);

  console.log(product);

  const handleAddCard = () => {
    if (!newCard.trim()) return;
    setCardOffers((prev) => [...prev, newCard.trim()]);
    setNewCard("");
  };

  const handleSubmit = async () => {
    console.log("Submitting trade:", {
      itemId: targetItem.id.toString(),
      moneyOffer,
      cardOffers,
    });
    // e.g. await fetch("/api/trades", { method: "POST", body: JSON.stringify({ … }) })
    alert("Trade proposed!");
  };

  return (
    <div className="space-y-6 rounded bg-white p-6 shadow">
      <div className="flex flex-col space-y-1">
        <Label htmlFor="moneyOffer">Cash Offer</Label>
        <Input
          id="moneyOffer"
          type="text"
          placeholder="$0.00"
          value={moneyOffer}
          onChange={(e) => setMoneyOffer(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="newCard">
          Add a Card to Offer (Be as specific as you can to help to seller)
        </Label>
        <div className="flex space-x-2">
          <Input
            id="newCard"
            type="text"
            placeholder="e.g. Blue-Eyes White Dragon"
            value={newCard}
            onChange={(e) => setNewCard(e.target.value)}
          />
          <Button onClick={handleAddCard}>Add</Button>
        </div>
      </div>

      {/* List of Offered Cards */}
      {cardOffers.length > 0 && (
        <ul className="list-inside list-disc text-gray-700">
          {cardOffers.map((card, i) => (
            <li key={i}>{card}</li>
          ))}
        </ul>
      )}

      {/* Submit */}
      <Button className="w-full" onClick={handleSubmit}>
        Propose Trade
      </Button>
    </div>
  );
}
