import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'is' correctly", () => {
    // In mutated code, empty string in alternation makes \b(?:)s\b match 'is'
    // causing plural('is') to return 'is' instead of 'ises'
    expect(plural("is")).toBe("ises")
  })
})