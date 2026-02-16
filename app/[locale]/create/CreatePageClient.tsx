"use client";

import { useState, useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ObituaryData,
  TemplateCategory,
  VisualTheme,
} from "@/lib/types";
import { generateObituaryText } from "@/lib/templates";
import { PhotoUpload } from "@/components/templates/PhotoUpload";
import { ThemeSelector } from "@/components/templates/ThemeSelector";

const TOTAL_STEPS = 7;

const categories = ["mother", "father", "spouse", "grandparent", "sibling", "friend", "child", "general"] as const;

const hobbyKeys = ["reading", "gardening", "traveling", "music", "sports", "cooking", "fishing", "photography", "painting", "volunteering", "dancing", "writing"] as const;

const traitKeys = ["loving", "kind", "generous", "humorous", "strong", "compassionate", "patient", "wise", "gentle", "faithful", "resilient", "joyful"] as const;

const relationshipKeys = ["spouse", "son", "daughter", "brother", "sister", "grandchild", "mother", "father", "niece", "nephew", "friend"] as const;

const styleOptions = ["traditional", "heartfelt", "simple", "religious", "modern"] as const;

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
  const t = useTranslations("create");
  const te = useTranslations("enums");
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<VisualTheme>("soft-floral");
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
    const text = generateObituaryText(data, locale);
    if (typeof window !== "undefined") {
      localStorage.setItem("obituary-content", text);
      localStorage.setItem("obituary-data", JSON.stringify(data));
      // Save photo and theme so editor picks them up
      localStorage.setItem("editor-theme", selectedTheme);
      if (photo) {
        localStorage.setItem("editor-photo", photo);
      } else {
        localStorage.removeItem("editor-photo");
      }
    }
    router.push("/editor/custom");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{t("progress.step", { current: step, total: TOTAL_STEPS })}</span>
          <span>{t("progress.complete", { percent: Math.round((step / TOTAL_STEPS) * 100) })}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {([
            t("steps.relation"),
            t("steps.info"),
            t("steps.life"),
            t("steps.family"),
            t("steps.photo"),
            t("steps.service"),
            t("steps.style"),
          ]).map(
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
              {t("step1.title")}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {categories.map((key) => (
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
                  <span className="text-sm font-medium">{te(`category.${key}`)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Basic Info */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              {t("step2.title")}
            </h2>
            <div>
              <Label htmlFor="fullName">{t("step2.fullNameRequired")}</Label>
              <Input
                id="fullName"
                value={data.fullName}
                onChange={(e) => {
                  update("fullName", e.target.value);
                  const first = e.target.value.split(" ")[0];
                  update("firstName", first);
                }}
                placeholder={t("step2.fullNamePlaceholder")}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="dob">{t("step2.dateOfBirth")}</Label>
                <Input
                  id="dob"
                  type="date"
                  value={data.dateOfBirth}
                  onChange={(e) => update("dateOfBirth", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dop">{t("step2.dateOfPassingRequired")}</Label>
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
                <Label htmlFor="age">{t("step2.age")}</Label>
                <Input
                  id="age"
                  value={data.age}
                  onChange={(e) => update("age", e.target.value)}
                  placeholder={t("step2.agePlaceholder")}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">{t("step2.cityOfResidence")}</Label>
                <Input
                  id="city"
                  value={data.cityOfResidence}
                  onChange={(e) => update("cityOfResidence", e.target.value)}
                  placeholder={t("step2.cityPlaceholder")}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="pob">{t("step2.placeOfBirth")}</Label>
                <Input
                  id="pob"
                  value={data.placeOfBirth}
                  onChange={(e) => update("placeOfBirth", e.target.value)}
                  placeholder={t("step2.placeOfBirthPlaceholder")}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pop">{t("step2.placeOfPassing")}</Label>
                <Input
                  id="pop"
                  value={data.placeOfPassing}
                  onChange={(e) => update("placeOfPassing", e.target.value)}
                  placeholder={t("step2.placeOfPassingPlaceholder")}
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
              {t("step3.title")}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="occupation">{t("step3.occupation")}</Label>
                <Input
                  id="occupation"
                  value={data.occupation}
                  onChange={(e) => update("occupation", e.target.value)}
                  placeholder={t("step3.occupationPlaceholder")}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="education">{t("step3.education")}</Label>
                <Input
                  id="education"
                  value={data.education}
                  onChange={(e) => update("education", e.target.value)}
                  placeholder={t("step3.educationPlaceholder")}
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
                <Label htmlFor="military">{t("step3.militaryService")}</Label>
              </div>
              {data.militaryService && (
                <Input
                  value={data.militaryDetails}
                  onChange={(e) => update("militaryDetails", e.target.value)}
                  placeholder={t("step3.militaryPlaceholder")}
                  className="mt-2"
                />
              )}
            </div>

            <div>
              <Label>{t("step3.hobbies")}</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {hobbyKeys.map((hobbyKey) => {
                  const hobbyLabel = te(`hobby.${hobbyKey}`);
                  return (
                    <button
                      key={hobbyKey}
                      onClick={() => {
                        const hobbies = data.hobbies.includes(hobbyLabel)
                          ? data.hobbies.filter((h) => h !== hobbyLabel)
                          : [...data.hobbies, hobbyLabel];
                        update("hobbies", hobbies);
                      }}
                      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                        data.hobbies.includes(hobbyLabel)
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {hobbyLabel}
                    </button>
                  );
                })}
              </div>
              <Input
                value={data.customHobbies}
                onChange={(e) => update("customHobbies", e.target.value)}
                placeholder={t("step3.customHobbiesPlaceholder")}
                className="mt-2"
              />
            </div>

            <div>
              <Label>{t("step3.characterTraits")}</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {traitKeys.map((traitKey) => {
                  const traitLabel = te(`trait.${traitKey}`);
                  return (
                    <button
                      key={traitKey}
                      onClick={() => {
                        const traits = data.characterTraits.includes(traitLabel)
                          ? data.characterTraits.filter((t) => t !== traitLabel)
                          : [...data.characterTraits, traitLabel];
                        update("characterTraits", traits);
                      }}
                      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                        data.characterTraits.includes(traitLabel)
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {traitLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label htmlFor="achievements">{t("step3.achievements")}</Label>
              <Textarea
                id="achievements"
                value={data.achievements}
                onChange={(e) => update("achievements", e.target.value)}
                placeholder={t("step3.achievementsPlaceholder")}
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/* Step 4: Family Members */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              {t("step4.title")}
            </h2>

            {/* Survived By */}
            <div>
              <Label className="text-base">{t("step4.survivedBy")}</Label>
              <p className="mb-3 text-sm text-muted-foreground">
                {t("step4.survivedByDesc")}
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
                    <option value="">{t("step4.relationship")}</option>
                    {relationshipKeys.map((r) => (
                      <option key={r} value={te(`familyRelationship.${r}`)}>{te(`familyRelationship.${r}`)}</option>
                    ))}
                  </select>
                  <Input
                    value={member.name}
                    onChange={(e) => {
                      const updated = [...data.survivedBy];
                      updated[i] = { ...updated[i], name: e.target.value };
                      update("survivedBy", updated);
                    }}
                    placeholder={t("step4.name")}
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
                {t("step4.addAnother")}
              </Button>
            </div>

            {/* Preceded By */}
            <div>
              <Label className="text-base">{t("step4.precededBy")}</Label>
              <p className="mb-3 text-sm text-muted-foreground">
                {t("step4.precededByDesc")}
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
                    <option value="">{t("step4.relationship")}</option>
                    {relationshipKeys.map((r) => (
                      <option key={r} value={te(`familyRelationship.${r}`)}>{te(`familyRelationship.${r}`)}</option>
                    ))}
                  </select>
                  <Input
                    value={member.name}
                    onChange={(e) => {
                      const updated = [...data.precededBy];
                      updated[i] = { ...updated[i], name: e.target.value };
                      update("precededBy", updated);
                    }}
                    placeholder={t("step4.name")}
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
                {t("step4.addAnother")}
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Photo & Theme */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              {t("step5.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("step5.description")}
            </p>

            {/* Photo Upload */}
            <div>
              <Label className="mb-3 block text-base font-medium">{t("step5.uploadPhoto")}</Label>
              <div className="flex items-start gap-6">
                <PhotoUpload
                  photo={photo}
                  onPhotoChange={setPhoto}
                  size="lg"
                />
                <div className="flex-1 space-y-2 pt-2">
                  <p className="text-sm text-muted-foreground">
                    {t("step5.uploadPhotoDesc")}
                  </p>
                  <ul className="list-inside list-disc text-xs text-muted-foreground/80 space-y-1">
                    <li>{t("step5.tipPortrait")}</li>
                    <li>{t("step5.tipClear")}</li>
                    <li>{t("step5.tipFormat")}</li>
                  </ul>
                  {photo && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPhoto(null)}
                      className="mt-2"
                    >
                      {t("step5.removePhoto")}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Theme Selection */}
            <div>
              <Label className="mb-3 block text-base font-medium">{t("step5.chooseTheme")}</Label>
              <p className="mb-4 text-sm text-muted-foreground">
                {t("step5.chooseThemeDesc")}
              </p>
              <ThemeSelector selected={selectedTheme} onSelect={setSelectedTheme} />
            </div>
          </div>
        )}

        {/* Step 6: Service Info */}
        {step === 6 && (
          <div className="space-y-4">
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              {t("step6.title")}
            </h2>
            <div>
              <Label htmlFor="serviceType">{t("step6.serviceType")}</Label>
              <select
                id="serviceType"
                value={data.serviceType}
                onChange={(e) => update("serviceType", e.target.value)}
                className="mt-1 w-full rounded-lg border px-4 py-3 text-sm"
              >
                <option value="">{t("step6.selectType")}</option>
                <option value="Funeral">{t("step6.funeral")}</option>
                <option value="Memorial Service">{t("step6.memorialService")}</option>
                <option value="Celebration of Life">{t("step6.celebrationOfLife")}</option>
                <option value="Private">{t("step6.privateService")}</option>
                <option value="None">{t("step6.noService")}</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="serviceDate">{t("step6.date")}</Label>
                <Input
                  id="serviceDate"
                  type="date"
                  value={data.serviceDate}
                  onChange={(e) => update("serviceDate", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="serviceTime">{t("step6.time")}</Label>
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
              <Label htmlFor="serviceLocation">{t("step6.locationName")}</Label>
              <Input
                id="serviceLocation"
                value={data.serviceLocation}
                onChange={(e) => update("serviceLocation", e.target.value)}
                placeholder={t("step6.locationPlaceholder")}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="serviceAddress">{t("step6.address")}</Label>
              <Input
                id="serviceAddress"
                value={data.serviceAddress}
                onChange={(e) => update("serviceAddress", e.target.value)}
                placeholder={t("step6.addressPlaceholder")}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="additional">{t("step6.additionalInstructions")}</Label>
              <Textarea
                id="additional"
                value={data.additionalInstructions}
                onChange={(e) => update("additionalInstructions", e.target.value)}
                placeholder={t("step6.additionalPlaceholder")}
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/* Step 7: Style Selection */}
        {step === 7 && (
          <div>
            <h2 className="mb-4 font-serif text-xl font-semibold text-primary">
              {t("step7.title")}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {styleOptions.map((style) => (
                <button
                  key={style}
                  onClick={() => update("selectedStyle", style)}
                  className={`rounded-xl border-2 p-5 text-left transition-all ${
                    data.selectedStyle === style
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-medium text-primary">{t(`step7.${style}.label`)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`step7.${style}.desc`)}
                  </p>
                  <p className="mt-2 text-xs italic text-muted-foreground/70">
                    &ldquo;...{t(`step7.${style}.sample`)}...&rdquo;
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
            {t("nav.previous")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.setItem("obituary-draft", JSON.stringify(data));
              }
              alert(t("nav.draftSaved"));
            }}
          >
            {t("nav.saveDraft")}
          </Button>
          {step < TOTAL_STEPS ? (
            <Button
              onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
              disabled={!canProceed()}
            >
              {t("nav.next")}
            </Button>
          ) : (
            <Button onClick={handleGenerate}>
              {t("nav.generate")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
