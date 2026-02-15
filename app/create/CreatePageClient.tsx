"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ObituaryData,
  TemplateCategory,
  TemplateStyle,
  FamilyMember,
  CATEGORY_LABELS,
  HOBBY_OPTIONS,
  TRAIT_OPTIONS,
  FAMILY_RELATIONSHIP_OPTIONS,
} from "@/lib/types";
import { generateObituaryText } from "@/lib/templates";

const TOTAL_STEPS = 6;

const defaultData: ObituaryData = {
  relationship: "general",
  fullName: "",
  firstName: "",
  dateOfBirth: "",
  dateOfPassing: "",
  age: "",
  placeOfBirth: "",
  placeOfPassing: "",
  cityOfResidence: "",
  occupation: "",
  education: "",
  militaryService: false,
  militaryDetails: "",
  hobbies: [],
  customHobbies: "",
  achievements: "",
  characterTraits: [],
  survivedBy: [{ relationship: "", name: "" }],
  precededBy: [],
  serviceType: "",
  serviceDate: "",
  serviceTime: "",
  serviceLocation: "",
  serviceAddress: "",
  additionalInstructions: "",
  selectedStyle: "traditional",
};

export function CreatePageClient() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ObituaryData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("obituary-draft");
      if (saved) {
        try { return JSON.parse(saved); } catch { /* ignore */ }
      }
    }
    return defaultData;
  });

  const update = useCallback(<K extends keyof ObituaryData>(key: K, value: ObituaryData[K]) => {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      if (typeof window !== "undefined") {
        localStorage.setItem("obituary-draft", JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const canProceed = () => {
    if (step === 2) return data.fullName && data.dateOfPassing;
    return true;
  };

  const handleGenerate = () => {
    const text = generateObituaryText(data);
    if (typeof window !== "undefined") {
      localStorage.setItem("obituary-content", text);
      localStorage.setItem("obituary-data", JSON.stringify(data));
    }
    router.push("/editor/custom");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
          Create an Obituary
        </h1>
        <p className="mt-2 text-muted-foreground">
          Follow the steps below to create a personalized obituary
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {["Relationship", "Basic Info", "Life", "Family", "Service", "Style"].map(
            (label, i) => (
              <span
                key={i}
                className={step === i + 1 ? "font-medium text-primary" : ""}
              >
                {label}
              </span>
            )
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm sm:p-8">
        {/* Step 1: Relationship */}
        {step === 1 && (
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              Who is this obituary for?
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => update("relationship", key as TemplateCategory)}
                  className={`rounded-lg border-2 p-4 text-center transition-all ${
                    data.relationship === key
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="block text-2xl mb-1">
                    {key === "mother" ? "👩" : key === "father" ? "👨" : key === "spouse" ? "💑" : key === "grandparent" ? "👴" : key === "sibling" ? "👫" : key === "friend" ? "🤝" : key === "child" ? "👶" : "🕊️"}
                  </span>
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Basic Info */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              Basic Information
            </h2>
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={data.fullName}
                onChange={(e) => {
                  update("fullName", e.target.value);
                  const first = e.target.value.split(" ")[0];
                  update("firstName", first);
                }}
                placeholder="e.g., Margaret Elizabeth Johnson"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={data.dateOfBirth}
                  onChange={(e) => update("dateOfBirth", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dop">Date of Passing *</Label>
                <Input
                  id="dop"
                  type="date"
                  value={data.dateOfPassing}
                  onChange={(e) => update("dateOfPassing", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={data.age}
                  onChange={(e) => update("age", e.target.value)}
                  placeholder="e.g., 78"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">City of Residence</Label>
                <Input
                  id="city"
                  value={data.cityOfResidence}
                  onChange={(e) => update("cityOfResidence", e.target.value)}
                  placeholder="e.g., Portland, Oregon"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="pob">Place of Birth</Label>
                <Input
                  id="pob"
                  value={data.placeOfBirth}
                  onChange={(e) => update("placeOfBirth", e.target.value)}
                  placeholder="e.g., Springfield, Illinois"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pop">Place of Passing</Label>
                <Input
                  id="pop"
                  value={data.placeOfPassing}
                  onChange={(e) => update("placeOfPassing", e.target.value)}
                  placeholder="e.g., at home, surrounded by family"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Life Highlights */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              Life Highlights
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="occupation">Occupation / Career</Label>
                <Input
                  id="occupation"
                  value={data.occupation}
                  onChange={(e) => update("occupation", e.target.value)}
                  placeholder="e.g., Elementary school teacher"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  value={data.education}
                  onChange={(e) => update("education", e.target.value)}
                  placeholder="e.g., University of Illinois"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="military"
                  checked={data.militaryService}
                  onChange={(e) => update("militaryService", e.target.checked)}
                  className="h-4 w-4 rounded"
                />
                <Label htmlFor="military">Military Service</Label>
              </div>
              {data.militaryService && (
                <Input
                  value={data.militaryDetails}
                  onChange={(e) => update("militaryDetails", e.target.value)}
                  placeholder="e.g., the United States Army"
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <Label>Hobbies & Interests</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {HOBBY_OPTIONS.map((hobby) => (
                  <button
                    key={hobby}
                    onClick={() => {
                      const hobbies = data.hobbies.includes(hobby)
                        ? data.hobbies.filter((h) => h !== hobby)
                        : [...data.hobbies, hobby];
                      update("hobbies", hobbies);
                    }}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      data.hobbies.includes(hobby)
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {hobby}
                  </button>
                ))}
              </div>
              <Input
                value={data.customHobbies}
                onChange={(e) => update("customHobbies", e.target.value)}
                placeholder="Other hobbies (comma-separated)"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Character Traits</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {TRAIT_OPTIONS.map((trait) => (
                  <button
                    key={trait}
                    onClick={() => {
                      const traits = data.characterTraits.includes(trait)
                        ? data.characterTraits.filter((t) => t !== trait)
                        : [...data.characterTraits, trait];
                      update("characterTraits", traits);
                    }}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      data.characterTraits.includes(trait)
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {trait}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="achievements">Major Achievements</Label>
              <Textarea
                id="achievements"
                value={data.achievements}
                onChange={(e) => update("achievements", e.target.value)}
                placeholder="Notable achievements, awards, or contributions..."
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/* Step 4: Family Members */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              Family Members
            </h2>

            {/* Survived By */}
            <div>
              <Label className="text-base">Survived By</Label>
              <p className="mb-3 text-sm text-muted-foreground">
                List family members and loved ones who survive
              </p>
              {data.survivedBy.map((member, i) => (
                <div key={i} className="mb-2 flex gap-2">
                  <select
                    value={member.relationship}
                    onChange={(e) => {
                      const updated = [...data.survivedBy];
                      updated[i] = { ...updated[i], relationship: e.target.value };
                      update("survivedBy", updated);
                    }}
                    className="w-36 rounded-lg border px-3 py-2 text-sm"
                  >
                    <option value="">Relationship</option>
                    {FAMILY_RELATIONSHIP_OPTIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <Input
                    value={member.name}
                    onChange={(e) => {
                      const updated = [...data.survivedBy];
                      updated[i] = { ...updated[i], name: e.target.value };
                      update("survivedBy", updated);
                    }}
                    placeholder="Name"
                    className="flex-1"
                  />
                  {data.survivedBy.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        update("survivedBy", data.survivedBy.filter((_, j) => j !== i));
                      }}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => update("survivedBy", [...data.survivedBy, { relationship: "", name: "" }])}
              >
                + Add Another
              </Button>
            </div>

            {/* Preceded By */}
            <div>
              <Label className="text-base">Preceded in Death By</Label>
              <p className="mb-3 text-sm text-muted-foreground">
                List family members who have previously passed
              </p>
              {data.precededBy.map((member, i) => (
                <div key={i} className="mb-2 flex gap-2">
                  <select
                    value={member.relationship}
                    onChange={(e) => {
                      const updated = [...data.precededBy];
                      updated[i] = { ...updated[i], relationship: e.target.value };
                      update("precededBy", updated);
                    }}
                    className="w-36 rounded-lg border px-3 py-2 text-sm"
                  >
                    <option value="">Relationship</option>
                    {FAMILY_RELATIONSHIP_OPTIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <Input
                    value={member.name}
                    onChange={(e) => {
                      const updated = [...data.precededBy];
                      updated[i] = { ...updated[i], name: e.target.value };
                      update("precededBy", updated);
                    }}
                    placeholder="Name"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      update("precededBy", data.precededBy.filter((_, j) => j !== i));
                    }}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => update("precededBy", [...data.precededBy, { relationship: "", name: "" }])}
              >
                + Add Another
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Service Info */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              Service Information (Optional)
            </h2>
            <div>
              <Label htmlFor="serviceType">Service Type</Label>
              <select
                id="serviceType"
                value={data.serviceType}
                onChange={(e) => update("serviceType", e.target.value)}
                className="mt-1 w-full rounded-lg border px-4 py-3 text-sm"
              >
                <option value="">Select type...</option>
                <option value="Funeral">Funeral</option>
                <option value="Memorial Service">Memorial Service</option>
                <option value="Celebration of Life">Celebration of Life</option>
                <option value="Private">Private Service</option>
                <option value="None">No Service</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="serviceDate">Date</Label>
                <Input
                  id="serviceDate"
                  type="date"
                  value={data.serviceDate}
                  onChange={(e) => update("serviceDate", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="serviceTime">Time</Label>
                <Input
                  id="serviceTime"
                  type="time"
                  value={data.serviceTime}
                  onChange={(e) => update("serviceTime", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="serviceLocation">Location Name</Label>
              <Input
                id="serviceLocation"
                value={data.serviceLocation}
                onChange={(e) => update("serviceLocation", e.target.value)}
                placeholder="e.g., Grace Community Church"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="serviceAddress">Address</Label>
              <Input
                id="serviceAddress"
                value={data.serviceAddress}
                onChange={(e) => update("serviceAddress", e.target.value)}
                placeholder="e.g., 123 Main Street, Portland, OR"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="additional">Additional Instructions</Label>
              <Textarea
                id="additional"
                value={data.additionalInstructions}
                onChange={(e) => update("additionalInstructions", e.target.value)}
                placeholder='e.g., "In lieu of flowers, donations to the American Heart Association..."'
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/* Step 6: Style Selection */}
        {step === 6 && (
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              Choose a Writing Style
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {([
                {
                  style: "traditional" as const,
                  label: "Traditional / Formal",
                  desc: "Classic, dignified language following conventional obituary format.",
                  sample: "passed away peacefully on... was born in...",
                },
                {
                  style: "heartfelt" as const,
                  label: "Warm / Heartfelt",
                  desc: "Emotional, personal tone that celebrates the person's life.",
                  sample: "With heavy hearts, we announce... brought light and warmth...",
                },
                {
                  style: "simple" as const,
                  label: "Simple / Concise",
                  desc: "Brief, straightforward announcement of passing and key details.",
                  sample: "of [City] passed away on... will be remembered for...",
                },
                {
                  style: "religious" as const,
                  label: "Religious / Spiritual",
                  desc: "Faith-centered language with spiritual themes and scripture.",
                  sample: "was called home to be with the Lord... a person of deep faith...",
                },
                {
                  style: "modern" as const,
                  label: "Modern / Contemporary",
                  desc: "Fresh, personal narrative that captures the person's unique spirit.",
                  sample: "We lost an extraordinary person... lived every moment with purpose...",
                },
              ]).map((option) => (
                <button
                  key={option.style}
                  onClick={() => update("selectedStyle", option.style)}
                  className={`rounded-xl border-2 p-5 text-left transition-all ${
                    data.selectedStyle === option.style
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-medium text-primary">{option.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {option.desc}
                  </p>
                  <p className="mt-2 text-xs italic text-muted-foreground/70">
                    &ldquo;...{option.sample}...&rdquo;
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t pt-6">
          <Button
            variant="outline"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.setItem("obituary-draft", JSON.stringify(data));
              }
              alert("Draft saved! You can continue later.");
            }}
          >
            Save Draft
          </Button>
          {step < TOTAL_STEPS ? (
            <Button
              onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
              disabled={!canProceed()}
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleGenerate}>
              Generate Obituary
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
