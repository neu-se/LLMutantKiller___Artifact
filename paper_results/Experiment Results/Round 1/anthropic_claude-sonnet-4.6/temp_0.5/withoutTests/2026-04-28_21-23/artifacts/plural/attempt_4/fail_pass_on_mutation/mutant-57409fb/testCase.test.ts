import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should return plural form when num is 0", () => {
    expect(plural("cat", 0)).toBe("cats");
    expect(plural("dog", 0)).toBe("dogs");
    expect(plural("church", 0)).toBe("churches");
  });
});