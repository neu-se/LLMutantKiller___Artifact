import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rules initialization", () => {
  it("should return the plural function from addRule", () => {
    const result = plural.addRule("testwordxyz123", "testwordxyz123s");
    expect(result).toBe(plural);
    expect(plural("testwordxyz123")).toBe("testwordxyz123s");
  });
});