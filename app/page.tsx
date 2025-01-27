"use client";

import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Species {
  name: string;
  value: number;
  planets: string[];
}

interface StarType {
  name: string;
  expectedValue: number;
  species: Species[];
}

const starTypes: StarType[] = [
  {
    name: "Class M Red Dwarf",
    expectedValue: 1650000,
    species: [
      {
        name: "Bacterium Aurasus",
        value: 350000,
        planets: ["High metal content worlds", "Rocky bodies"],
      },
      {
        name: "Bacterium Vesicula",
        value: 425000,
        planets: ["Metal-rich bodies", "Rocky worlds"],
      },
      {
        name: "Concha Renibus",
        value: 875000,
        planets: ["High metal content worlds", "Rocky bodies with atmosphere"],
      },
    ],
  },
  {
    name: "Class K Orange Giant",
    expectedValue: 1825000,
    species: [
      {
        name: "Frutexa Flabellum",
        value: 725000,
        planets: ["Rocky ice worlds", "Icy bodies"],
      },
      {
        name: "Tubus Compagibus",
        value: 500000,
        planets: ["Metal-rich bodies", "High metal content worlds"],
      },
      {
        name: "Tussock Pennata",
        value: 600000,
        planets: ["Rocky bodies", "Rocky ice worlds"],
      },
    ],
  },
  {
    name: "Class F White Star",
    expectedValue: 2100000,
    species: [
      {
        name: "Electricae Pluma",
        value: 800000,
        planets: ["Metal-rich bodies", "High metal content worlds"],
      },
      {
        name: "Fonticulua Segmentatus",
        value: 650000,
        planets: ["Rocky bodies", "High metal content worlds"],
      },
      {
        name: "Tussock Caeruleum",
        value: 650000,
        planets: ["Rocky ice worlds", "Icy bodies"],
      },
    ],
  },
];

export default function Home() {
  const [openStarType, setOpenStarType] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#141414]/90 text-[#ff8c32] p-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-12 text-center relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff8c32]/50 to-transparent" />
        <div className="flex items-center justify-center gap-2 mb-4 pt-8">
          <Star className="w-8 h-8" />
          <h1 className="text-4xl font-bold tracking-wider font-orbitron">ELITE DANGEROUS EXOBIOLOGY STAR CHART</h1>
          <Star className="w-8 h-8" />
        </div>
        <p className="text-[#ff8c32]/70 text-lg font-rajdhani font-light">
          Comprehensive guide to biological discoveries across the galaxy
        </p>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ff8c32]/50 to-transparent" />
      </div>

      {/* Star Types Grid */}
      <div className="max-w-4xl mx-auto grid gap-6">
        {starTypes.map((starType) => (
          <div
            key={starType.name}
            className="bg-[#1a1a1a] border-l-2 border-[#ff8c32] rounded-r-lg overflow-hidden relative group"
          >
            <div className="absolute inset-y-0 left-0 w-full h-full bg-gradient-to-r from-[#ff8c32]/5 to-transparent" />
            <div className="p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-[#ff8c32]" />
                  <h2 className="text-2xl font-light tracking-wide font-rajdhani">{starType.name}</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#ff8c32]/70 font-rajdhani">Expected Value</p>
                  <p className="text-xl font-mono font-bold">
                    {starType.expectedValue.toLocaleString()} cr
                  </p>
                </div>
              </div>

              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="species" className="border-[#ff8c32]/30">
                  <AccordionTrigger className="hover:text-[#ff8c32] hover:no-underline font-rajdhani font-light">
                    Species Distribution
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      {starType.species.map((species) => (
                        <Accordion
                          key={species.name}
                          type="single"
                          collapsible
                          className="bg-[#141414] rounded-lg p-4 border-l border-[#ff8c32]/30"
                        >
                          <AccordionItem
                            value="planets"
                            className="border-none"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-light font-rajdhani">
                                {species.name}
                              </h3>
                              <p className="font-mono font-bold">
                                {species.value.toLocaleString()} cr
                              </p>
                            </div>
                            <AccordionTrigger className="py-0 hover:text-[#ff8c32] hover:no-underline">
                              <span className="text-sm text-[#ff8c32]/70 font-rajdhani">
                                View planet types
                              </span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-none text-sm text-[#ff8c32]/90 mt-2 space-y-1 font-rajdhani font-light">
                                {species.planets.map((planet) => (
                                  <li key={planet} className="flex items-center gap-2 before:content-['▶'] before:text-[0.5em] before:text-[#ff8c32]/50">
                                    {planet}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}