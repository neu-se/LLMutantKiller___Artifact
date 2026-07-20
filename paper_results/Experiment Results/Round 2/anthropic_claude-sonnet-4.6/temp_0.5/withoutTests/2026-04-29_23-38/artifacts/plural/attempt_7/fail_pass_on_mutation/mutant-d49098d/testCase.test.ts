import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'run-ins' correctly", () => {
    // 'run-ins' ends in 's' after a word character 'n', not after a non-word char
    // so the empty alternative in mutated regex shouldn't match
    // falls to /s$/ rule -> 'run-inses'
    // Testing a word where the 's' is preceded by a word character (no boundary before s)
    expect(plural("run-ins")).toBe("run-inses")
  })
})