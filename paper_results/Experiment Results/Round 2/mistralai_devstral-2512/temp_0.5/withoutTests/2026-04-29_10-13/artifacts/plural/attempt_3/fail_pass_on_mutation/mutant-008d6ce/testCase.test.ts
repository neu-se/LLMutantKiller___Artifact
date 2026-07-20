import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return singular form when num is 1", () => {
    expect(plural("cat", 1)).toBe("cat");
    expect(plural("box", 1)).toBe("box");
    expect(plural("child", 1)).toBe("child");
  });
});