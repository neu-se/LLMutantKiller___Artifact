import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should not treat 's' as an already-plural word", () => {
    // In mutated code, empty string in alternation creates pattern matching \b(?:)s\b
    // which matches the single character word 's'
    // causing plural('s') to return 's' instead of 'ss'
    expect(plural("s")).toBe("ss")
  })
})