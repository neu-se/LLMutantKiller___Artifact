import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with num parameter", () => {
  it("should return plural form when num is undefined", () => {
    const result = plural("child", undefined);
    expect(result).toBe("children");
  });
});