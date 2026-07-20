import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - mutation detection for electronic word removal", () => {
  it("should pluralize 's' as 'ss' not return it unchanged due to empty regex alternative", () => {
    expect(plural("s")).toBe("ss");
  });
});