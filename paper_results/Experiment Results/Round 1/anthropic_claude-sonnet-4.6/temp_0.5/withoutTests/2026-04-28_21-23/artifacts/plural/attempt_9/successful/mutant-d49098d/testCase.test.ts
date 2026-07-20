import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize word 's' correctly - misc rule added after s$ rule so checked first", () => {
    // misc rule is added after /x$|ch$|s$/ rule, so via unshift it's checked FIRST
    // In mutated code, empty string makes \b(?:)s\b match standalone 's'
    // so plural('s') returns 's' instead of going to s$ rule
    expect(plural("s")).toBe("ses")
  })
})