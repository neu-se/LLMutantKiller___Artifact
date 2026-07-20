import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with num parameter", () => {
  it("should return plural form when num is not 1", () => {
    const result = plural("child", 2);
    expect(result).toBe("children");
  });
});