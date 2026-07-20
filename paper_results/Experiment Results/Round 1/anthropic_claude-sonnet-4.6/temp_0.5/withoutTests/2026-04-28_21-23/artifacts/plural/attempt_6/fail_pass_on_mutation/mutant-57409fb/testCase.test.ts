import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should pluralize correctly when num is NaN", () => {
    // NaN !== 1 is true, so both versions should pluralize
    expect(plural("cat", NaN)).toBe("cats");
  });
});