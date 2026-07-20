import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return plural form when num is not provided", () => {
    expect(plural("cat")).toBe("cats");
  });
});