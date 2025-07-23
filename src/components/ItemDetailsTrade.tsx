"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { ItemType } from "~/server/db/schema";

interface ItemDetailsTradeProps {
  product: ItemType;
}

const ItemDetailsTrade = ({ product }: ItemDetailsTradeProps) => {
  const [moneyOffer, setMoneyOffer] = useState("");
  const [contact, setContact] = useState("");
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
    alert("Trade proposed!");
  };

  const removeCard = (index: number) => {
    setCardOffers((prevCards) => {
      const newCards = prevCards.filter(
        (card, cardIndex) => cardIndex != index,
      );
      return newCards;
    });
  };

  return (
    <div className="space-y-6 rounded bg-white p-6">
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

      <div className="flex flex-col space-y-1">
        <Label htmlFor="contact">
          Contact Information (optional, but helpful when negotiating with the
          seller)
        </Label>
        <Input
          id="contact"
          type="text"
          placeholder="abc123@gmail.com"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
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

      {cardOffers.length > 0 && (
        <ul className="max-h-[10vh] list-inside list-disc overflow-y-scroll text-gray-700">
          {cardOffers.map((card, i) => (
            <div key={i} className="flex justify-between px-2">
              <li>{card}</li>
              <button onClick={() => removeCard(i)}>×</button>
            </div>
          ))}
        </ul>
      )}

      <Button className="w-full" onClick={handleSubmit}>
        Propose Trade
      </Button>
    </div>
  );
};

export default ItemDetailsTrade;
