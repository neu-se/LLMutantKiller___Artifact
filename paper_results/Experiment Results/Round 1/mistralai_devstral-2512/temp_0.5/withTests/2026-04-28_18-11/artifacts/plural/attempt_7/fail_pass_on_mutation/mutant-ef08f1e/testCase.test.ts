import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending in 'o' preceded by a vowel", () => {
    expect(plural("radio")).toBe("radios");
    expect(plural("kilo")).toBe("kiloes");
    expect(plural("zoo")).toBe("zoos");
  });
});