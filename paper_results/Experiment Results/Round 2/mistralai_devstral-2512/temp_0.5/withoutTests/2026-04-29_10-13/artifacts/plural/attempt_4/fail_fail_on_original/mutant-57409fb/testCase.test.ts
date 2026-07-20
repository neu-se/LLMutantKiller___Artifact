import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with num parameter", () => {
  it("should return plural form when num is 0", () => {
    const result = plural("child", 0);
    expect(result).toBe("children");
  });
});