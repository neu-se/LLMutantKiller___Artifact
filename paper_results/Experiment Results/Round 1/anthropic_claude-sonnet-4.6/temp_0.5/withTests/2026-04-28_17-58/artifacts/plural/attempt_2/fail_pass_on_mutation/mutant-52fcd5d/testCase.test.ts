import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural handles regular words correctly", () => {
  it("should pluralize 'test' to 'tests'", () => {
    expect(plural("test")).toBe("tests");
  });
});