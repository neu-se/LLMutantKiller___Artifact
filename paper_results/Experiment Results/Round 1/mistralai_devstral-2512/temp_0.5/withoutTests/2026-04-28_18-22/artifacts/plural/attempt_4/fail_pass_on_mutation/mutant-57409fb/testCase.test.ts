import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return plural form when num is 0", () => {
    expect(plural("cat", 0)).toBe("cats");
  });
});