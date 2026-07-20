import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'y' when preceded by a vowel", () => {
    expect(plural("key", 2)).toBe("keys");
  });
});