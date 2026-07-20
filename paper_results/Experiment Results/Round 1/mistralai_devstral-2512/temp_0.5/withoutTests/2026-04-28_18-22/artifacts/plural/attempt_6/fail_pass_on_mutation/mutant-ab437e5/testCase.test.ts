import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'y' after a vowel", () => {
    expect(plural("day", 2)).toBe("days");
  });
});