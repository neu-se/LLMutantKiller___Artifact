import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should NOT pluralize when num equals 1", () => {
    expect(plural("cat", 1)).toBe("cat");
    expect(plural("dog", 1)).toBe("dog");
    expect(plural("church", 1)).toBe("church");
    expect(plural("person", 1)).toBe("person");
  });
});