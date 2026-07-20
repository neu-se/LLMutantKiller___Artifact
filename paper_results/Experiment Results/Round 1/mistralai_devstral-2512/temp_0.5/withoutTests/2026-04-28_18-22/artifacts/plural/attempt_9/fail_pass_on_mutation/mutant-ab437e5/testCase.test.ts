import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'y' when preceded by a consonant", () => {
    expect(plural("baby", 2)).toBe("babies");
  });
});