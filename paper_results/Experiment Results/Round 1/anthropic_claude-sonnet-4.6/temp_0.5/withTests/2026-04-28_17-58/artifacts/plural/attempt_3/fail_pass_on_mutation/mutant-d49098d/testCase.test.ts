import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - empty string in misc array causes regex to match bare 's'", () => {
  it("should pluralize 'bus' as 'buses' not return it unchanged", () => {
    // In the mutated code, the empty string in misc creates a regex that matches
    // any word ending in 's' at a word boundary, causing 'bus' to return 'bus' instead of 'buses'
    expect(plural("bus")).toBe("buses");
  });
});