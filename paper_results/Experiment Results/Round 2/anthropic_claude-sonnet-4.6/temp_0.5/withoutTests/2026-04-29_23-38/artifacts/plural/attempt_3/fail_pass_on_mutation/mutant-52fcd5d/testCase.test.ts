import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'bus' correctly as 'buses' not return it unchanged", () => {
    // In mutated code, empty string in regex causes \b(?:...|)s\b to match 'bus' (ending in s at word boundary)
    // returning it unchanged, but original should return 'buses'
    expect(plural("bus")).toBe("buses")
  })
})