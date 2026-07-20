import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return singular form when num is exactly 1 and plural form when num is undefined", () => {
    expect(plural("cat", 1)).toBe("cat");
    expect(plural("cat", undefined)).toBe("cats");
  });
});