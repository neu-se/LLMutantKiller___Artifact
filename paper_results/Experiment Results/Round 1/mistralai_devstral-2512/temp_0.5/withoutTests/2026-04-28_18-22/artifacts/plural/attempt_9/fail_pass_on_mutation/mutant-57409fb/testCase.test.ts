import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return plural form when num is not 1 and not undefined", () => {
    expect(plural("cat", 2)).toBe("cats");
  });
});