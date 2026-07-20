import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with undefined count", () => {
  it("should return plural form when count is undefined", () => {
    const result = plural("child", undefined);
    expect(result).toBe("children");
  });
});