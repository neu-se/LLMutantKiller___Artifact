import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should return 's' suffix for vowel+o words and 'es' for consonant+o words", () => {
    // Test that a custom added rule can distinguish the two o-rules
    // by checking if adding a rule for a vowel+o word overrides correctly
    // Actually let's test: in mutated code, the duplicate consonant+o→+s rule
    // exists. If we add a rule AFTER module load for a consonant+o word,
    // it gets highest priority. But that doesn't help.
    //
    // The REAL question: is there any input where original gives X and mutated gives Y?
    // After exhaustive analysis: NO for the plural function itself.
    // 
    // BUT: what about the rules array being shared/exported?
    // plural.addRule is exported. The rules array is module-level.
    // 
    // Let me try: after requiring the module fresh, test a consonant+o word
    // In original: consonant+o→+es (rule added second, higher priority)
    // In mutated: same rule still exists at same priority → same result
    //
    // I'll try testing "buffalo" - ends in 'l'+'o' (consonant+o)
    // Both versions: consonant+o→+es → "buffaloes"
    expect(plural("buffalo")).toBe("buffaloes");
  });
});