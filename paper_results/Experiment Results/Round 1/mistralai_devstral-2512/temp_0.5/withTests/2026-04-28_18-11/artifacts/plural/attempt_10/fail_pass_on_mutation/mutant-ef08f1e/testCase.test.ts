import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending in 'o' preceded by a vowel when followed by other letters", () => {
    expect(plural("kilo")).toBe("kiloes");
    expect(plural("radio")).toBe("radios");
    expect(plural("studio")).toBe("studios");
    expect(plural("video")).toBe("videos");
    expect(plural("zoo")).toBe("zoos");
  });
});