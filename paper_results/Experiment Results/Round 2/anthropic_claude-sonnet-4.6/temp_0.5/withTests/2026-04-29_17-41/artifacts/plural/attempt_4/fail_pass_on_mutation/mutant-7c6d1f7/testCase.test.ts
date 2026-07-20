import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - stereo type words with vowel before o", () => {
  it("should pluralize 'cameo' as 'cameos' via the vowel+o rule", () => {
    // cameo ends in 'eo' - vowel before o
    // Original: /[aeiouy]o$/i matches -> 'cameos'  
    // Mutated: /[^aeiouy]o$/i does NOT match, falls to default -> 'cameos'
    // Both give same result... trying 'patio' ending in 'io'
    expect(plural("patio")).toBe("patios");
  });
});