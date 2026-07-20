import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural handles 'as' correctly", () => {
  it("should pluralize 'as' to 'ases'", () => {
    expect(plural("as")).toBe("ases");
  });
});