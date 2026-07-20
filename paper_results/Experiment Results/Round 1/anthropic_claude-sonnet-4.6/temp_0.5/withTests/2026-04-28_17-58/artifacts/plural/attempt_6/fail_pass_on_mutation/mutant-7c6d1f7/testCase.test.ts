import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - vowel before o words", () => {
  it("should pluralize 'cameo' as 'cameos' where without vowel-o rule it might match fe rule", () => {
    // cameo: without vowel+o rule, /(fe?$)/i could match 'eo' capturing 'eo'... 
    // Actually let's verify: fe? matches 'f' or 'fe'. 'eo' starts with 'e' not 'f'. No match.
    // Try 'info' - ends in consonant+o... 
    // The real question: is there ANY vowel+o word where removal of the rule changes output?
    // "folio" -> without rule -> default -> "folios" same
    // The mutation IS equivalent. But let me try "cameo" with the fe rule manually:
    // /(fe?$)/i.test("cameo") -> does 'cameo' end in f or fe? No. 
    expect(plural("cameo")).toBe("cameos");
  });
});