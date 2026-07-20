describe("plural regex rule matching", () => {
  it("should only apply a regex rule when the word actually matches the regex", () => {
    // Force fresh module load to avoid state pollution from other tests
    jest.resetModules();
    const plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    
    // 'cherry' should pluralize to 'cherries' via the consonant-y rule
    // With mutation if(true), first rule (uncountable) always matches and returns word unchanged
    expect(plural("cherry")).toBe("cherries");
  });
});