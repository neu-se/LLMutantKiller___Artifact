import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - mutation detection via empty string in misc array", () => {
  it("should pluralize the word 's' as 'ses' not return it unchanged", () => {
    expect(plural("s")).toBe("ses");
  });
});