import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'bus' correctly", () => {
    // In mutated code, empty string in regex alternation creates \b(?:...|)s\b
    // which matches ANY word ending in 's', causing 'bus' to return 'bus' instead of 'buses'
    expect(plural("bus")).toBe("buses")
  })
})