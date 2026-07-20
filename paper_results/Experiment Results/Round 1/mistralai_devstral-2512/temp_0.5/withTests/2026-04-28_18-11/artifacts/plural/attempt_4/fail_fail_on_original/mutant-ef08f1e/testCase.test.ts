import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending in 'o' preceded by a vowel when followed by other letters", () => {
    expect(plural("kilo")).toBe("kilos");
  });
});