import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural basic functionality", () => {
  it("should pluralize a simple word by appending s", () => {
    expect(plural("test")).toBe("tests");
  });
});