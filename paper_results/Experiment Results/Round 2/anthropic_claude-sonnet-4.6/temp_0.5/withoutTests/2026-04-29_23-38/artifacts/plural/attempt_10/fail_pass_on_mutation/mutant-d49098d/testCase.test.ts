import plural, { addRule } from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should not treat words ending in s after non-word chars as already plural", () => {
    // The mutation adds "" to misc array creating \b(?:...|)s\b
    // This empty alternative can match \b + '' + s + \b
    // In "1s", "2s" etc., digit is non-word so \b exists before 's'
    // Testing with a word containing a number followed by s
    // Original: no match in misc -> falls to /s$/ -> appends 'es'
    // Mutated: empty alt matches -> returns unchanged
    expect(plural("1s")).toBe("1ses")
  })
})