import { plural } from "../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending in 'o' with a vowel before the 'o'", () => {
    expect(plural("radio")).toBe("radios");
    expect(plural("studio")).toBe("studios");
    expect(plural("video")).toBe("videos");
    expect(plural("zoo")).toBe("zoos");
  });
});