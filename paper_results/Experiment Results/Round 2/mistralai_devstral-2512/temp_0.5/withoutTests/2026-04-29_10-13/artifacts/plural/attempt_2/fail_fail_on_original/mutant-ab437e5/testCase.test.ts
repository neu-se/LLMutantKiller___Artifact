import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'y' not preceded by a vowel", () => {
    expect(plural("sky")).toBe("skies");
    expect(plural("fly")).toBe("flies");
    expect(plural("candy")).toBe("candies");
  });
});