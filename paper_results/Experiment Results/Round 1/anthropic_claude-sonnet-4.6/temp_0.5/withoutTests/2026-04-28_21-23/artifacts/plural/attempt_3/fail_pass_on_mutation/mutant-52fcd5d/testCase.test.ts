import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should correctly pluralize a word ending in 's' that is not in the misc list", () => {
    // In mutated code, the empty string in regex creates \b(?:...|)s\b
    // which matches any word ending in 's', causing 'lass' to return 'lass' instead of 'lasses'
    expect(plural("lass")).toBe("lasses")
  })
})