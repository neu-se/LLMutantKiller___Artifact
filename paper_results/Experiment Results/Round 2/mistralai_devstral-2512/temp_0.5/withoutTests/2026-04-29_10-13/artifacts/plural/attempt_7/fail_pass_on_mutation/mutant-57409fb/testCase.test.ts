import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with num parameter", () => {
  it("should return singular form when num is exactly 1", () => {
    const result = plural("goose", 1);
    expect(result).toBe("goose");
  });
});