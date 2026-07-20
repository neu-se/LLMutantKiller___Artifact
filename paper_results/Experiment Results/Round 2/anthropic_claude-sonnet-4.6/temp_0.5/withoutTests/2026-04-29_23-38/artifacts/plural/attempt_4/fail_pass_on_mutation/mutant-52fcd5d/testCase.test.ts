import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'cherry' correctly even when input contains word boundary with s", () => {
    // Test that the empty string mutation doesn't cause 'lass' to be returned unchanged
    // 'lass' ends in 's' at word boundary - mutated regex with empty alt matches it
    expect(plural("lass")).toBe("lasses")
  })
})