import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should pluralize words when num is not 1", () => {
    expect(plural("cat", 2)).toBe("cats");
  });
});