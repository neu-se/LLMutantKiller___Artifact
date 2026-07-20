import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function with words containing 'x'", () => {
  it("should not pluralize words containing 'x' that don't end with 'x'", () => {
    expect(plural("example")).toBe("examples");
    expect(plural("examine")).toBe("examines");
    expect(plural("text")).toBe("texts");
  });
});