import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - empty string mutation detection", () => {
  it("should pluralize the word 's' as 'ses' not keep it as 's'", () => {
    expect(plural("s")).toBe("ses");
  });
});