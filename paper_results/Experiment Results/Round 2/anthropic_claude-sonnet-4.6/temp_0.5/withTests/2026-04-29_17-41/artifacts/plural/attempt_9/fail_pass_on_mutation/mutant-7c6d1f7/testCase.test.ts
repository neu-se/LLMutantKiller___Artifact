import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - words ending in consonant+o", () => {
  it("should pluralize 'potato' as 'potatoes' not 'potatos'", () => {
    expect(plural("potato")).toBe("potatoes");
  });
});