import templatesData from "@/data/templates.json";
import { Template, TemplateCategory, TemplateStyle, TemplateLength, ObituaryData } from "@/lib/types";

export function getTemplates(): Template[] {
  return templatesData as Template[];
}

export function getTemplateById(id: string): Template | undefined {
  return getTemplates().find((t) => t.id === id);
}

export function getPopularTemplates(): Template[] {
  return getTemplates().filter((t) => t.popular);
}

export function getTemplatesByCategory(category: TemplateCategory): Template[] {
  return getTemplates().filter((t) => t.category === category);
}

export function filterTemplates(filters: {
  category?: TemplateCategory;
  style?: TemplateStyle;
  length?: TemplateLength;
}): Template[] {
  let results = getTemplates();
  if (filters.category) {
    results = results.filter((t) => t.category === filters.category);
  }
  if (filters.style) {
    results = results.filter((t) => t.style === filters.style);
  }
  if (filters.length) {
    results = results.filter((t) => t.length === filters.length);
  }
  return results;
}

export function getRelatedTemplates(template: Template, limit = 3): Template[] {
  return getTemplates()
    .filter(
      (t) =>
        t.id !== template.id &&
        (t.category === template.category || t.style === template.style)
    )
    .slice(0, limit);
}

export function generateObituaryText(data: ObituaryData): string {
  const pronoun = getPronoun(data.relationship);
  const possessive = getPossessivePronoun(data.relationship);
  const object = getObjectPronoun(data.relationship);

  const traits = data.characterTraits.join(", ");
  const hobbies = [...data.hobbies, ...(data.customHobbies ? [data.customHobbies] : [])].join(", ");
  const survivedByText = data.survivedBy
    .map((m) => `${m.relationship.toLowerCase()} ${m.name}`)
    .join("; ");
  const precededByText = data.precededBy
    .map((m) => `${m.relationship.toLowerCase()} ${m.name}`)
    .join("; ");

  const style = data.selectedStyle;

  if (style === "simple") {
    return generateSimple(data, pronoun, possessive, traits, hobbies, survivedByText, precededByText);
  } else if (style === "heartfelt") {
    return generateHeartfelt(data, pronoun, possessive, object, traits, hobbies, survivedByText, precededByText);
  } else if (style === "religious") {
    return generateReligious(data, pronoun, possessive, traits, hobbies, survivedByText, precededByText);
  } else if (style === "modern") {
    return generateModern(data, pronoun, possessive, object, traits, hobbies, survivedByText, precededByText);
  }

  // Default: traditional
  return generateTraditional(data, pronoun, possessive, object, traits, hobbies, survivedByText, precededByText);
}

function generateTraditional(
  data: ObituaryData, pronoun: string, possessive: string, object: string,
  traits: string, hobbies: string, survivedBy: string, precededBy: string
): string {
  let text = `${data.fullName}, age ${data.age}, of ${data.cityOfResidence || "[City]"}, passed away peacefully on ${data.dateOfPassing}.`;

  if (data.dateOfBirth) {
    text += ` ${pronoun} was born on ${data.dateOfBirth}`;
    if (data.placeOfBirth) text += ` in ${data.placeOfBirth}`;
    text += ".";
  }

  if (data.occupation) {
    text += `\n\n${data.firstName} dedicated ${possessive} career to ${data.occupation}`;
    if (data.education) text += `, having studied at ${data.education}`;
    text += `.`;
  }

  if (traits) {
    text += ` ${pronoun} was known for being ${traits}, touching the lives of everyone who knew ${object}.`;
  }

  if (data.militaryService && data.militaryDetails) {
    text += ` ${data.firstName} honorably served in ${data.militaryDetails}.`;
  }

  if (hobbies) {
    text += `\n\n${data.firstName} found great joy in ${hobbies}.`;
  }

  if (data.achievements) {
    text += ` Among ${possessive} achievements, ${data.achievements}.`;
  }

  if (survivedBy) {
    text += `\n\n${data.firstName} is survived by ${possessive} loving ${survivedBy}.`;
  }
  if (precededBy) {
    text += ` ${pronoun} was preceded in death by ${precededBy}.`;
  }

  text += buildServiceText(data);

  return text;
}

function generateHeartfelt(
  data: ObituaryData, pronoun: string, possessive: string, object: string,
  traits: string, hobbies: string, survivedBy: string, precededBy: string
): string {
  let text = `With heavy hearts, we announce the passing of ${data.fullName}, who left us on ${data.dateOfPassing} at the age of ${data.age}. ${pronoun} will be dearly missed by all who had the privilege of knowing ${object}.`;

  if (data.dateOfBirth && data.placeOfBirth) {
    text += `\n\nBorn on ${data.dateOfBirth} in ${data.placeOfBirth}, ${data.firstName} brought light and warmth into every room ${pronoun.toLowerCase()} entered.`;
  }

  if (traits) {
    text += ` ${data.firstName}'s ${traits} nature made ${object} someone truly special.`;
  }

  if (data.occupation) {
    text += `\n\n${data.firstName} poured ${possessive} heart into ${possessive} work as a ${data.occupation}, where ${pronoun.toLowerCase()} made a lasting impact.`;
  }

  if (hobbies) {
    text += ` Outside of work, ${pronoun.toLowerCase()} found happiness in ${hobbies}, sharing these passions with those ${pronoun.toLowerCase()} loved most.`;
  }

  if (survivedBy) {
    text += `\n\n${data.firstName} leaves behind ${possessive} beloved ${survivedBy}, who will carry ${possessive} memory in their hearts forever.`;
  }
  if (precededBy) {
    text += ` ${pronoun} is now reunited with ${precededBy}.`;
  }

  text += buildServiceText(data);

  return text;
}

function generateSimple(
  data: ObituaryData, pronoun: string, possessive: string,
  traits: string, hobbies: string, survivedBy: string, precededBy: string
): string {
  let text = `${data.fullName}\n${data.dateOfBirth || ""} – ${data.dateOfPassing}\n\n`;
  text += `${data.firstName} of ${data.cityOfResidence || "[City]"} passed away on ${data.dateOfPassing} at age ${data.age}.`;

  if (data.occupation) {
    text += ` ${pronoun} was a ${data.occupation}.`;
  }

  if (traits) {
    text += ` ${data.firstName} will be remembered for being ${traits}.`;
  }

  if (survivedBy) {
    text += `\n\nSurvived by ${possessive} ${survivedBy}.`;
  }
  if (precededBy) {
    text += ` Preceded in death by ${precededBy}.`;
  }

  text += buildServiceText(data);

  return text;
}

function generateReligious(
  data: ObituaryData, pronoun: string, possessive: string,
  traits: string, hobbies: string, survivedBy: string, precededBy: string
): string {
  let text = `${data.fullName}, age ${data.age}, was called home to be with the Lord on ${data.dateOfPassing}.`;

  if (data.dateOfBirth && data.placeOfBirth) {
    text += ` ${pronoun} was born on ${data.dateOfBirth} in ${data.placeOfBirth}.`;
  }

  text += `\n\nA person of deep faith, ${data.firstName} lived ${possessive} life as a testament to God's love.`;

  if (data.occupation) {
    text += ` ${pronoun} served faithfully as a ${data.occupation}.`;
  }

  if (traits) {
    text += ` ${data.firstName}'s ${traits} spirit was a blessing to all who knew ${possessive.toLowerCase() === "his" ? "him" : "her"}.`;
  }

  if (hobbies) {
    text += `\n\nIn ${possessive} quiet moments, ${data.firstName} enjoyed ${hobbies}.`;
  }

  if (survivedBy) {
    text += `\n\n${data.firstName} is survived by ${possessive} cherished ${survivedBy}.`;
  }
  if (precededBy) {
    text += ` ${pronoun} is now reunited in heaven with ${precededBy}.`;
  }

  text += buildServiceText(data);

  text += `\n\n"For I am convinced that neither death nor life... shall be able to separate us from the love of God." — Romans 8:38-39`;

  return text;
}

function generateModern(
  data: ObituaryData, pronoun: string, possessive: string, object: string,
  traits: string, hobbies: string, survivedBy: string, precededBy: string
): string {
  let text = `${data.fullName} — ${data.dateOfBirth || ""} to ${data.dateOfPassing}\n\n`;
  text += `We lost an extraordinary person on ${data.dateOfPassing}. ${data.firstName} was ${data.age} years old and lived every moment with purpose.`;

  if (data.placeOfBirth) {
    text += `\n\nBorn in ${data.placeOfBirth}, ${data.firstName} grew up to become so much more than any title could capture.`;
  }

  if (data.occupation) {
    text += ` As a ${data.occupation}, ${pronoun.toLowerCase()} made ${possessive} mark.`;
  }

  if (traits) {
    text += ` But to those who knew ${object}, ${data.firstName} was simply ${traits}.`;
  }

  if (hobbies) {
    text += `\n\nWhether ${data.firstName} was ${hobbies.toLowerCase().includes("and") ? "enjoying" : "pursuing"} ${hobbies}, ${pronoun.toLowerCase()} approached everything with authenticity and joy.`;
  }

  if (survivedBy) {
    text += `\n\n${data.firstName} leaves behind ${survivedBy}, each of whom was made better by knowing ${object}.`;
  }
  if (precededBy) {
    text += ` ${pronoun} was preceded in death by ${precededBy}.`;
  }

  text += buildServiceText(data);

  return text;
}

function buildServiceText(data: ObituaryData): string {
  if (!data.serviceType || data.serviceType === "None") return "";

  let text = "\n\n";
  text += `A ${data.serviceType.toLowerCase()} will be held`;
  if (data.serviceDate) text += ` on ${data.serviceDate}`;
  if (data.serviceTime) text += ` at ${data.serviceTime}`;
  if (data.serviceLocation) text += ` at ${data.serviceLocation}`;
  if (data.serviceAddress) text += `, ${data.serviceAddress}`;
  text += ".";

  if (data.additionalInstructions) {
    text += ` ${data.additionalInstructions}`;
  }

  return text;
}

function getPronoun(relationship: string): string {
  const feminine = ["mother", "spouse", "grandparent", "sibling", "friend", "child", "general"];
  if (["mother"].includes(relationship)) return "She";
  if (["father"].includes(relationship)) return "He";
  return "They";
}

function getPossessivePronoun(relationship: string): string {
  if (["mother"].includes(relationship)) return "her";
  if (["father"].includes(relationship)) return "his";
  return "their";
}

function getObjectPronoun(relationship: string): string {
  if (["mother"].includes(relationship)) return "her";
  if (["father"].includes(relationship)) return "him";
  return "them";
}

export function fillTemplate(template: Template, data: Partial<ObituaryData>): string {
  let content = template.content;

  const replacements: Record<string, string> = {
    "{{fullName}}": data.fullName || "[Full Name]",
    "{{firstName}}": data.firstName || "[First Name]",
    "{{age}}": data.age || "[Age]",
    "{{dateOfBirth}}": data.dateOfBirth || "[Date of Birth]",
    "{{dateOfPassing}}": data.dateOfPassing || "[Date of Passing]",
    "{{placeOfBirth}}": data.placeOfBirth || "[Place of Birth]",
    "{{placeOfPassing}}": data.placeOfPassing || "[Place of Passing]",
    "{{cityOfResidence}}": data.cityOfResidence || "[City]",
    "{{occupation}}": data.occupation || "[Occupation]",
    "{{hobbies}}": data.hobbies?.join(", ") || "[Hobbies]",
    "{{characterTraits}}": data.characterTraits?.join(", ") || "[Character Traits]",
    "{{survivedBy}}": data.survivedBy?.map((m) => `${m.relationship} ${m.name}`).join("; ") || "[Survived By]",
    "{{precededBy}}": data.precededBy?.map((m) => `${m.relationship} ${m.name}`).join("; ") || "[Preceded By]",
    "{{serviceDetails}}": data.serviceType ? `A ${data.serviceType} will be held${data.serviceDate ? ` on ${data.serviceDate}` : ""}${data.serviceLocation ? ` at ${data.serviceLocation}` : ""}.` : "[Service Details]",
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    content = content.replaceAll(placeholder, value);
  }

  return content;
}
