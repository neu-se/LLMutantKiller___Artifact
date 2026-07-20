import plural, { addRule } from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should have rules that correctly handle the fe rule with dwarf", () => {
    // The fe rule has 'if (false)' which means dwarf -> dwarves (not dwarfs)
    // This tests the rule works correctly regardless of rules array initialization
    expect(plural("dwarf")).toBe("dwarves")
  })
})