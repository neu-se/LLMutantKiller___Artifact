import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'electronic' to 'electronics'", () => {
    // In the original, 'electronic' is in misc array matching 'electronics' (with s).
    // 'electronic' (singular, no s) doesn't match that rule, so it gets 's' appended -> 'electronics'.
    // In the mutated code, "" replaces 'electronic', creating regex with empty alternative
    // \b(?:...|)s\b. Testing if 'electronic' still correctly becomes 'electronics'.
    // The empty string in the regex join creates \b(?:...|entrail||outskirt|...)s\b
    // which could cause 'electronics' to match (empty string + 's' = 's' at boundary).
    expect(plural("electronic")).toBe("electronics")
  })
})