import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rules initialization", () => {
  it("should pluralize 'S' to 'Ses' not 't' even with explicit num=2", () => {
    expect(plural("S", 2)).toBe("Ses");
  });
});