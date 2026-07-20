import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should not pluralize words ending with 'ay' (vowel before y)", () => {
    expect(plural("day")).toBe("days");
    expect(plural("way")).toBe("ways");
    expect(plural("play")).toBe("plays");
  });
});