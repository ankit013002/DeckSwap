"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { ItemType } from "~/server/db/schema";

interface ItemDetailsFormProps {
  product: ItemType;
}

const ItemDetailsForm = ({ product }: ItemDetailsFormProps) => {
  const [moneyOffer, setMoneyOffer] = useState("");
  const [cardOffers, setCardOffers] = useState<string[]>([]);
  const [newCard, setNewCard] = useState("");

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
};

export default ItemDetailsForm;
