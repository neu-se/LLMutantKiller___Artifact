import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should pluralize cherry to cherries", () => {
    expect(plural("cherry", 2)).toBe("cherries");
  });
});