import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return singular form when num is 1 and plural form when num is any other value including undefined", () => {
    expect(plural("cat", 1)).toBe("cat");
    expect(plural("cat", undefined)).toBe("cats");
    expect(plural("cat", 0)).toBe("cats");
    expect(plural("cat", 2)).toBe("cats");
  });
});