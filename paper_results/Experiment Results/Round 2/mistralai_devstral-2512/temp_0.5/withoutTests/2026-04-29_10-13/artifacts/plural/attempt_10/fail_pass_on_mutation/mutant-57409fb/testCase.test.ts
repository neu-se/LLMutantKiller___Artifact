import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with num parameter", () => {
  it("should return plural form when num is undefined", () => {
    const result = plural("goose", undefined);
    expect(result).toBe("geese");
  });
});