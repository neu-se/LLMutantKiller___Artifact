import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize '3s' correctly", () => {
    // In original: '3s' - digit '3' is non-word char, so \b before 's'
    // misc regex \b(?:...|electronic|...)s\b - none match '3' prefix, no match
    // falls through to /s$/ -> '3ses'
    // In mutated: misc regex \b(?:...|)s\b - empty alt fires at \b before 's'
    // \b between '3' (non-word) and 's' (word) -> empty matches -> 's' matches -> \b at end
    // Returns '3s' unchanged
    expect(plural("3s")).toBe("3ses")
  })
})