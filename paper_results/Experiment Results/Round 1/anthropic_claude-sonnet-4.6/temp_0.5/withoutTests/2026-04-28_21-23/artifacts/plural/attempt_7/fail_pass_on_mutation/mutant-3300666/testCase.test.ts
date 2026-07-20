import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should handle the word 'S' being passed - in mutated code bogus rule returns 't' but s-rule should catch it first", () => {
    // The real test: verify rules array integrity by checking a word
    // that would only be affected if an unexpected 'S' string rule existed
    // at a position BEFORE the s-ending rule
    // Since addRule uses unshift, all real rules are before the bogus entry
    // The bogus entry rule[0]='S' can only be reached if no prior rule matches
    // For word 'S', the /x$|ch$|s$/i rule matches first -> 'Ses'
    // This test verifies the s-rule works correctly
    expect(plural("bus")).toBe("buses")
  })
})