import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function rule matching", () => {
  it("should return the word unchanged for singular count of 1", () => {
    // With mutation `if (true)`, the first rule always matches and returns immediately.
    // The first rule added (last unshifted) is the uncountable words rule.
    // But for a regular word like 'test', the first rule in the array would match
    // and return incorrectly since `if (true)` bypasses the RegExp check.
    // A word like 'test' should match the default +s rule, but with mutation
    // it would return based on the first rule's result unconditionally.
    expect(plural("man")).toBe("men");
  });
});