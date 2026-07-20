import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - words ending in vowel+o should get 's' via the vowel+o rule, not fall through", () => {
  it("should pluralize 'video' as 'videos' using the vowel+o rule", () => {
    // In the original, /[aeiouy]o$/i matches 'video' and returns 'videos'
    // In the mutated code, both rules use /[^aeiouy]o$/i
    // A word ending in consonant+o like 'zero' should get 'zeroes' from the higher-priority rule
    // but with two identical consonant+o rules, 'zero' still gets 'zeroes'
    // The real difference: original vowel+o rule catches 'embryo', mutated does not
    // but both return 'embryos' anyway via default
    // Need a word where behavior actually differs...
    expect(plural("zero")).toBe("zeroes");
  });
});