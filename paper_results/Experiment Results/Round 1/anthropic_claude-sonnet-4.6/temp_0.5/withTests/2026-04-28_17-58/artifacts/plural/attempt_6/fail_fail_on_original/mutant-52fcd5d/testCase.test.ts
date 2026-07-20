import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural handles single letter s", () => {
  it("should pluralize 's' to 'ss'", () => {
    expect(plural("s")).toBe("ss");
  });
});