"use client";

import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import starTypesData from "@/data/processed-data.json";

interface BodyType {
  name: string;
  count: number;
  percentage: number;
}

interface Atmosphere {
  name: string;
  count: number;
  percentage: number;
}

interface SpeciesContribution {
  species: string;
  contribution: number;
  probability: number;
  count: number;
  bodyTypes: BodyType[];
  atmospheres: Atmosphere[];
  reward: number;
}

interface StarType {
  name: string;
  expectedValue: number;
  totalOccurrences: number;
  speciesContributions: SpeciesContribution[];
}

const starTypes: StarType[] = starTypesData;

export default function Home() {
  const [openStarType, setOpenStarType] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#141414]/90 text-[#ff8c32] p-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-12 text-center relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff8c32]/50 to-transparent" />
        <div className="flex items-center justify-center gap-2 mb-4 pt-8">
          <Star className="w-8 h-8" />
          <h1 className="text-4xl font-bold tracking-wider font-orbitron">
            ELITE DANGEROUS EXOBIOLOGY STAR CHART
          </h1>
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
                  <div>
                    <h2 className="text-2xl font-light tracking-wide font-rajdhani">
                      {starType.name}
                    </h2>
                    <p className="text-sm text-[#ff8c32]/70 font-rajdhani">
                      Total Exobiology Reports:{" "}
                      <span className="font-mono font-bold">
                        {starType.totalOccurrences.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#ff8c32]/70 font-rajdhani">
                    Expected Value
                  </p>
                  <p className="text-xl font-mono font-bold">
                    {parseInt(
                      starType.expectedValue.toFixed(0)
                    ).toLocaleString()}{" "}
                    cr
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
                      {starType.speciesContributions.map(
                        (speciesContribution) => (
                          <Accordion
                            key={speciesContribution.species}
                            type="single"
                            collapsible
                            className="bg-[#141414] rounded-lg p-4 border-l border-[#ff8c32]/30"
                          >
                            <AccordionItem
                              value="planets"
                              className="border-none"
                            >
                              <div className="flex items-top justify-between mb-2">
                                <div>
                                  <h3 className="text-lg font-light font-rajdhani">
                                    {speciesContribution.species}
                                  </h3>
                                  <p className="text-sm text-[#ff8c32]/70 font-rajdhani">
                                    Reward if found:{" "}
                                    {speciesContribution.reward.toLocaleString()}{" "}
                                    cr
                                  </p>
                                  <p className="text-sm text-[#ff8c32]/70 font-rajdhani">
                                    Probability:{" "}
                                    {speciesContribution.probability.toFixed(2)}
                                  </p>
                                  <p className="text-sm text-[#ff8c32]/70 font-rajdhani">
                                    Occurrences: {speciesContribution.count} out
                                    of {starType.totalOccurrences}
                                  </p>
                                </div>
                                <p className="font-mono font-bold">
                                  {speciesContribution.contribution.toLocaleString()}{" "}
                                  cr
                                </p>
                              </div>
                              <AccordionTrigger className="py-0 hover:text-[#ff8c32] hover:no-underline">
                                <span className="text-sm text-[#ff8c32]/70 font-mono font-bold">
                                  View planet types
                                </span>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="grid grid-cols-2 gap-4 mt-2 p-4 bg-[#ff8c32]/5">
                                  <div>
                                    <h3 className="text-[#ff8c32] font-rajdhani font-medium mb-2">
                                      Body Type
                                    </h3>
                                    <ul className="list-none text-sm text-[#ff8c32]/90 space-y-1 font-rajdhani font-light">
                                      {speciesContribution.bodyTypes.map(
                                        (bodyType) => (
                                          <li
                                            key={bodyType.name}
                                            className="flex items-center gap-2 before:content-['▶'] before:text-[0.5em] before:text-[#ff8c32]/50"
                                          >
                                            {bodyType.name} (
                                            {bodyType.percentage}%)
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                  <div>
                                    <h3 className="text-[#ff8c32] font-rajdhani font-medium mb-2">
                                      Atmosphere
                                    </h3>
                                    <ul className="list-none text-sm text-[#ff8c32]/90 space-y-1 font-rajdhani font-light">
                                      {speciesContribution.atmospheres.map(
                                        (atmosphere) => (
                                          <li
                                            key={atmosphere.name}
                                            className="flex items-center gap-2 before:content-['▶'] before:text-[0.5em] before:text-[#ff8c32]/50"
                                          >
                                            {atmosphere.name} (
                                            {atmosphere.percentage}%)
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        )
                      )}
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
