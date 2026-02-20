"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { FeaturedRules } from "@/components/featured-rules";
import { CategoryPills } from "@/components/category-pills";
import { PromptGrid } from "@/components/prompt-grid";
import { PricingSection } from "@/components/pricing-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { type Category, rules } from "@/lib/data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredRules = useMemo(() => {
    return rules.filter((rule) => {
      const matchesCategory =
        selectedCategory === "All" || rule.category === selectedCategory;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        query === "" ||
        rule.title.toLowerCase().includes(query) ||
        rule.description.toLowerCase().includes(query) ||
        rule.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const isFiltering = searchQuery !== "" || selectedCategory !== "All";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero with search */}
        <div className="mx-auto max-w-6xl px-6">
          <HeroSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* How it works */}
        <div className="mx-auto max-w-6xl px-6">
          <HowItWorks />
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* Featured rules (hide when filtering) */}
        {!isFiltering && (
          <div className="mx-auto max-w-6xl px-6">
            <FeaturedRules rules={rules} />
          </div>
        )}

        {/* Divider */}
        {!isFiltering && (
          <div className="mx-auto max-w-6xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </div>
        )}

        {/* Category pills + grid */}
        <div className="mx-auto max-w-6xl px-6 pt-14">
          <CategoryPills
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <PromptGrid rules={filteredRules} />
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* Pricing */}
        <div className="mx-auto max-w-6xl px-6">
          <PricingSection />
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-6xl px-6">
          <CtaSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
