import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with num parameter", () => {
  it("should return plural form when num is 2", () => {
    const result = plural("goose", 2);
    expect(result).toBe("geese");
  });
});