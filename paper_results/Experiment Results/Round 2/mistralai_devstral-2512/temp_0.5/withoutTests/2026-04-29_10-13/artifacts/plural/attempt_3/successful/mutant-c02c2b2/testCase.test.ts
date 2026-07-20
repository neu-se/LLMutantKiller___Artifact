import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return plural form when num is 2", () => {
    expect(plural("cat", 2)).toBe("cats");
  });
});