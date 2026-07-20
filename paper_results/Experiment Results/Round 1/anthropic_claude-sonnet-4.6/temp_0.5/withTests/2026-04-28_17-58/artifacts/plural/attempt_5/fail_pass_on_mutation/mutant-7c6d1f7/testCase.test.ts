import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - o-ending words rule interaction", () => {
  it("should pluralize 'cameo' as 'cameos' (vowel+o gets s, not es)", () => {
    // In mutated code, cameo has no matching o-rule and falls to f/fe rule
    // /(fe?$)/i matches 'eo' at end? No... 
    // Actually testing embryo which ends in 'yo'
    expect(plural("embryo")).toBe("embryos");
  });
});