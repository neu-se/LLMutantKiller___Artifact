import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return plural form when num is undefined", () => {
    expect(plural("cat", undefined)).toBe("cats");
  });
});