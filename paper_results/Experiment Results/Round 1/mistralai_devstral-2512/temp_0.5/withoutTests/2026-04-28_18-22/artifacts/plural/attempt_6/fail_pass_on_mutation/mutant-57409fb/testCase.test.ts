import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return plural form when num is any value except 1", () => {
    expect(plural("cat", 1)).toBe("cat");
    expect(plural("cat", 0)).toBe("cats");
    expect(plural("cat", 2)).toBe("cats");
    expect(plural("cat", -1)).toBe("cats");
    expect(plural("cat", null)).toBe("cats");
    expect(plural("cat", undefined)).toBe("cats");
  });
});