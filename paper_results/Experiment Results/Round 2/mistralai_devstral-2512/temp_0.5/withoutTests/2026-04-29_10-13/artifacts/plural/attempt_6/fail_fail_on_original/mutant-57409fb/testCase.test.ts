import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with num parameter", () => {
  it("should return plural form when num is not provided", () => {
    const result = plural("child");
    expect(result).toBe("children");
  });
});