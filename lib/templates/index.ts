import enTemplates from "@/data/templates/en.json";
import { Template, TemplateCategory, TemplateStyle, TemplateLength, ObituaryData } from "@/lib/types";

// Lazy-load locale-specific templates
const templatesByLocale: Record<string, Template[]> = {
  en: enTemplates as Template[],
};

async function loadLocaleTemplates(locale: string): Promise<Template[]> {
  if (templatesByLocale[locale]) return templatesByLocale[locale];
  try {
    const mod = await import(`@/data/templates/${locale}.json`);
    templatesByLocale[locale] = mod.default as Template[];
    return templatesByLocale[locale];
  } catch {
    return templatesByLocale.en;
  }
}

// Synchronous version for SSG - falls back to English if locale not pre-loaded
export function getTemplates(locale: string = "en"): Template[] {
  // For SSG, all locale templates are loaded via JSON imports
  if (locale === "de") {
    try {
      const deTemplates = require("@/data/templates/de.json");
      return deTemplates as Template[];
    } catch {
      return enTemplates as Template[];
    }
  }
  if (locale === "ja") {
    try {
      const jaTemplates = require("@/data/templates/ja.json");
      return jaTemplates as Template[];
    } catch {
      return enTemplates as Template[];
    }
  }
  return enTemplates as Template[];
}

export function getTemplateById(id: string, locale: string = "en"): Template | undefined {
  return getTemplates(locale).find((t) => t.id === id);
}

export function getPopularTemplates(locale: string = "en"): Template[] {
  return getTemplates(locale).filter((t) => t.popular);
}

export function getTemplatesByCategory(category: TemplateCategory, locale: string = "en"): Template[] {
  return getTemplates(locale).filter((t) => t.category === category);
}

export function filterTemplates(filters: {
  category?: TemplateCategory;
  style?: TemplateStyle;
  length?: TemplateLength;
}, locale: string = "en"): Template[] {
  let results = getTemplates(locale);
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

export function getRelatedTemplates(template: Template, locale: string = "en", limit = 3): Template[] {
  return getTemplates(locale)
    .filter(
      (t) =>
        t.id !== template.id &&
        (t.category === template.category || t.style === template.style)
    )
    .slice(0, limit);
}

export function generateObituaryText(data: ObituaryData, locale: string = "en"): string {
  // For now, German and Japanese use the same English generator
  // These will be replaced with locale-specific generators
  if (locale === "de") {
    return generateObituaryTextDe(data);
  }
  if (locale === "ja") {
    return generateObituaryTextJa(data);
  }
  return generateObituaryTextEn(data);
}

function generateObituaryTextEn(data: ObituaryData): string {
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

// German obituary text generator
function generateObituaryTextDe(data: ObituaryData): string {
  const isFemale = ["mother"].includes(data.relationship);
  const isMale = ["father"].includes(data.relationship);
  const pronoun = isFemale ? "Sie" : isMale ? "Er" : "Sie/Er";
  const possessive = isFemale ? "ihre" : isMale ? "seine" : "ihre/seine";
  const possessiveCapital = isFemale ? "Ihre" : isMale ? "Seine" : "Ihre/Seine";

  const traits = data.characterTraits.join(", ");
  const hobbies = [...data.hobbies, ...(data.customHobbies ? [data.customHobbies] : [])].join(", ");
  const survivedByText = data.survivedBy
    .map((m) => `${m.relationship} ${m.name}`)
    .join("; ");
  const precededByText = data.precededBy
    .map((m) => `${m.relationship} ${m.name}`)
    .join("; ");

  const style = data.selectedStyle;

  let text = "";

  if (style === "simple") {
    text = `${data.fullName}\n${data.dateOfBirth || ""} – ${data.dateOfPassing}\n\n`;
    text += `${data.firstName} aus ${data.cityOfResidence || "[Stadt]"} verstarb am ${data.dateOfPassing} im Alter von ${data.age} Jahren.`;
    if (data.occupation) text += ` ${pronoun} war ${data.occupation}.`;
    if (traits) text += ` ${data.firstName} wird in Erinnerung bleiben als ${traits}.`;
    if (survivedByText) text += `\n\n${data.firstName} hinterlässt ${possessive} ${survivedByText}.`;
    if (precededByText) text += ` ${pronoun} wurde im Tod vorausgegangen von ${precededByText}.`;
  } else if (style === "heartfelt") {
    text = `Mit schwerem Herzen geben wir das Ableben von ${data.fullName} bekannt, die/der uns am ${data.dateOfPassing} im Alter von ${data.age} Jahren verlassen hat.`;
    if (data.dateOfBirth && data.placeOfBirth) {
      text += `\n\nGeboren am ${data.dateOfBirth} in ${data.placeOfBirth}, brachte ${data.firstName} Licht und Wärme in jeden Raum.`;
    }
    if (traits) text += ` ${possessiveCapital} ${traits} Art machte ${data.firstName} zu einem ganz besonderen Menschen.`;
    if (data.occupation) text += `\n\n${data.firstName} widmete sich mit Leidenschaft ${possessive}r Arbeit als ${data.occupation}.`;
    if (hobbies) text += ` In der Freizeit fand ${pronoun.toLowerCase()} Freude an ${hobbies}.`;
    if (survivedByText) text += `\n\n${data.firstName} hinterlässt ${possessive} geliebte/n ${survivedByText}.`;
    if (precededByText) text += ` ${pronoun} ist nun wieder vereint mit ${precededByText}.`;
  } else if (style === "religious") {
    text = `${data.fullName}, im Alter von ${data.age} Jahren, wurde am ${data.dateOfPassing} in die Ewigkeit gerufen.`;
    if (data.dateOfBirth && data.placeOfBirth) text += ` ${pronoun} wurde am ${data.dateOfBirth} in ${data.placeOfBirth} geboren.`;
    text += `\n\nAls gläubiger Mensch lebte ${data.firstName} ${possessive} Leben als Zeugnis der Liebe Gottes.`;
    if (data.occupation) text += ` ${pronoun} diente treu als ${data.occupation}.`;
    if (traits) text += ` ${data.firstName}s ${traits} Wesen war ein Segen für alle.`;
    if (hobbies) text += `\n\nIn stillen Momenten genoss ${data.firstName} ${hobbies}.`;
    if (survivedByText) text += `\n\n${data.firstName} hinterlässt ${possessive} geschätzten ${survivedByText}.`;
    if (precededByText) text += ` ${pronoun} ist nun im Himmel wieder vereint mit ${precededByText}.`;
    text += `\n\n„Denn ich bin gewiss, dass weder Tod noch Leben... uns scheiden kann von der Liebe Gottes." — Römer 8,38-39`;
  } else if (style === "modern") {
    text = `${data.fullName} — ${data.dateOfBirth || ""} bis ${data.dateOfPassing}\n\n`;
    text += `Wir haben am ${data.dateOfPassing} einen außergewöhnlichen Menschen verloren. ${data.firstName} wurde ${data.age} Jahre alt und lebte jeden Moment mit Bedeutung.`;
    if (data.placeOfBirth) text += `\n\nGeboren in ${data.placeOfBirth}, wurde ${data.firstName} zu viel mehr als jeder Titel ausdrücken könnte.`;
    if (data.occupation) text += ` Als ${data.occupation} hinterließ ${pronoun.toLowerCase()} ${possessive} Spuren.`;
    if (traits) text += ` Für diejenigen, die ${data.firstName} kannten, war ${pronoun.toLowerCase()} einfach ${traits}.`;
    if (hobbies) text += `\n\nOb ${data.firstName} ${hobbies} nachging — ${pronoun.toLowerCase()} tat alles mit Authentizität und Freude.`;
    if (survivedByText) text += `\n\n${data.firstName} hinterlässt ${survivedByText}.`;
    if (precededByText) text += ` ${pronoun} wurde im Tod vorausgegangen von ${precededByText}.`;
  } else {
    // Traditional
    text = `${data.fullName}, im Alter von ${data.age} Jahren, aus ${data.cityOfResidence || "[Stadt]"}, verstarb friedlich am ${data.dateOfPassing}.`;
    if (data.dateOfBirth) {
      text += ` ${pronoun} wurde am ${data.dateOfBirth} geboren`;
      if (data.placeOfBirth) text += ` in ${data.placeOfBirth}`;
      text += ".";
    }
    if (data.occupation) {
      text += `\n\n${data.firstName} widmete ${possessive} Karriere ${data.occupation}`;
      if (data.education) text += ` und studierte an ${data.education}`;
      text += `.`;
    }
    if (traits) text += ` ${pronoun} war bekannt für ${possessive} ${traits} Art.`;
    if (data.militaryService && data.militaryDetails) text += ` ${data.firstName} diente ehrenhaft bei ${data.militaryDetails}.`;
    if (hobbies) text += `\n\n${data.firstName} fand große Freude an ${hobbies}.`;
    if (data.achievements) text += ` Zu ${possessive}n Errungenschaften zählen ${data.achievements}.`;
    if (survivedByText) text += `\n\n${data.firstName} hinterlässt ${possessive} liebevollen ${survivedByText}.`;
    if (precededByText) text += ` ${pronoun} wurde im Tod vorausgegangen von ${precededByText}.`;
  }

  text += buildServiceTextDe(data);
  return text;
}

function buildServiceTextDe(data: ObituaryData): string {
  if (!data.serviceType || data.serviceType === "None") return "";
  let text = "\n\n";
  text += `Eine ${data.serviceType} findet statt`;
  if (data.serviceDate) text += ` am ${data.serviceDate}`;
  if (data.serviceTime) text += ` um ${data.serviceTime}`;
  if (data.serviceLocation) text += ` in ${data.serviceLocation}`;
  if (data.serviceAddress) text += `, ${data.serviceAddress}`;
  text += ".";
  if (data.additionalInstructions) text += ` ${data.additionalInstructions}`;
  return text;
}

// Japanese obituary text generator
function generateObituaryTextJa(data: ObituaryData): string {
  const traits = data.characterTraits.join("、");
  const hobbies = [...data.hobbies, ...(data.customHobbies ? [data.customHobbies] : [])].join("、");
  const survivedByText = data.survivedBy
    .map((m) => `${m.relationship} ${m.name}`)
    .join("、");
  const precededByText = data.precededBy
    .map((m) => `${m.relationship} ${m.name}`)
    .join("、");

  const style = data.selectedStyle;
  let text = "";

  if (style === "simple") {
    text = `${data.fullName}\n${data.dateOfBirth || ""} – ${data.dateOfPassing}\n\n`;
    text += `${data.firstName}様は${data.dateOfPassing}に${data.age}歳で永眠されました。`;
    if (data.cityOfResidence) text += `${data.cityOfResidence}にお住まいでした。`;
    if (data.occupation) text += `${data.occupation}としてご活躍されました。`;
    if (traits) text += `${data.firstName}様は${traits}な方として記憶されます。`;
    if (survivedByText) text += `\n\nご遺族：${survivedByText}。`;
    if (precededByText) text += `先立たれた方：${precededByText}。`;
  } else if (style === "heartfelt") {
    text = `${data.fullName}様が${data.dateOfPassing}に${data.age}歳で旅立たれましたことを、深い悲しみとともにお知らせいたします。`;
    if (data.dateOfBirth && data.placeOfBirth) {
      text += `\n\n${data.dateOfBirth}に${data.placeOfBirth}でお生まれになり、周囲の方々に温かさと光をもたらしてくださいました。`;
    }
    if (traits) text += `${data.firstName}様の${traits}なお人柄は、多くの方々に愛されておりました。`;
    if (data.occupation) text += `\n\n${data.firstName}様は${data.occupation}として情熱を注がれました。`;
    if (hobbies) text += `また、${hobbies}を楽しまれ、大切な方々とその喜びを分かち合われました。`;
    if (survivedByText) text += `\n\n${data.firstName}様は${survivedByText}を遺されました。`;
    if (precededByText) text += `今頃は${precededByText}と再会されていることでしょう。`;
  } else if (style === "religious") {
    text = `${data.fullName}様（享年${data.age}歳）は${data.dateOfPassing}に神のもとへ召されました。`;
    if (data.dateOfBirth && data.placeOfBirth) text += `${data.dateOfBirth}に${data.placeOfBirth}にてお生まれになりました。`;
    text += `\n\n深い信仰をお持ちの方として、${data.firstName}様は神の愛の証として生きられました。`;
    if (data.occupation) text += `${data.occupation}として忠実にお仕えになりました。`;
    if (traits) text += `${data.firstName}様の${traits}な精神は、すべての方への祝福でした。`;
    if (hobbies) text += `\n\n静かな時間には、${hobbies}を楽しまれました。`;
    if (survivedByText) text += `\n\n${data.firstName}様は${survivedByText}を遺されました。`;
    if (precededByText) text += `天国にて${precededByText}と再会されていることでしょう。`;
    text += `\n\n「わたしは確信しています。死も、命も…わたしたちの主キリスト・イエスによる神の愛から、わたしたちを引き離すことはできないのです。」— ローマ人への手紙 8:38-39`;
  } else if (style === "modern") {
    text = `${data.fullName} — ${data.dateOfBirth || ""} ～ ${data.dateOfPassing}\n\n`;
    text += `${data.dateOfPassing}、私たちはかけがえのない方を失いました。${data.firstName}様は${data.age}歳で、一瞬一瞬を大切に生きられました。`;
    if (data.placeOfBirth) text += `\n\n${data.placeOfBirth}でお生まれになり、どんな肩書きにも収まらない素晴らしい方に成長されました。`;
    if (data.occupation) text += `${data.occupation}として、確かな足跡を残されました。`;
    if (traits) text += `${data.firstName}様を知る方々にとって、その方は${traits}な方でした。`;
    if (hobbies) text += `\n\n${hobbies}に取り組まれる時も、常に誠実さと喜びに満ちていらっしゃいました。`;
    if (survivedByText) text += `\n\n${data.firstName}様は${survivedByText}を遺されました。`;
    if (precededByText) text += `${precededByText}に先立たれておりました。`;
  } else {
    // Traditional
    text = `${data.fullName}様（享年${data.age}歳、${data.cityOfResidence || "[市区町村]"}在住）は${data.dateOfPassing}に安らかに永眠されました。`;
    if (data.dateOfBirth) {
      text += `${data.dateOfBirth}にお生まれになりました`;
      if (data.placeOfBirth) text += `（出生地：${data.placeOfBirth}）`;
      text += "。";
    }
    if (data.occupation) {
      text += `\n\n${data.firstName}様は${data.occupation}に人生を捧げられました`;
      if (data.education) text += `。${data.education}にて学ばれました`;
      text += `。`;
    }
    if (traits) text += `${traits}なお人柄で、出会うすべての方の人生を豊かにされました。`;
    if (data.militaryService && data.militaryDetails) text += `${data.firstName}様は${data.militaryDetails}にて名誉ある軍務に就かれました。`;
    if (hobbies) text += `\n\n${data.firstName}様は${hobbies}に大きな喜びを見出されていました。`;
    if (data.achievements) text += `主な功績として、${data.achievements}が挙げられます。`;
    if (survivedByText) text += `\n\nご遺族：${survivedByText}。`;
    if (precededByText) text += `先立たれた方：${precededByText}。`;
  }

  text += buildServiceTextJa(data);
  return text;
}

function buildServiceTextJa(data: ObituaryData): string {
  if (!data.serviceType || data.serviceType === "None") return "";
  let text = "\n\n";
  text += `${data.serviceType}は`;
  if (data.serviceDate) text += `${data.serviceDate}`;
  if (data.serviceTime) text += ` ${data.serviceTime}より`;
  if (data.serviceLocation) text += ` ${data.serviceLocation}にて`;
  if (data.serviceAddress) text += `（${data.serviceAddress}）`;
  text += "執り行われます。";
  if (data.additionalInstructions) text += `${data.additionalInstructions}`;
  return text;
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
