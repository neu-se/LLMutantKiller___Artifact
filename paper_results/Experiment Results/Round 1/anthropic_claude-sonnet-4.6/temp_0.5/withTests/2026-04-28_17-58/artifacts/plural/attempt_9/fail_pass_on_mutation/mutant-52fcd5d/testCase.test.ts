import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural handles words starting with s", () => {
  it("should pluralize 'star' to 'stars'", () => {
    expect(plural("star")).toBe("stars");
  });
});