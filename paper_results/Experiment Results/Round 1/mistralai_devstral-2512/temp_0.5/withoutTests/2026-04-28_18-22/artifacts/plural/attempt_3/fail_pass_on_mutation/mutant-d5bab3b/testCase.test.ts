import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'woman' to 'women'", () => {
    expect(plural("woman")).toBe("women");
  });
});