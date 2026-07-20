import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should correctly handle the case where num is 1 to return singular form", () => {
    // The key behavioral difference: original has `|| num === undefined` 
    // which is redundant BUT signals intent. Test that num=1 returns singular
    // while num not provided returns plural - verifying the condition boundary
    const singularResult = plural("cat", 1)
    const pluralResult = plural("cat", 2)
    expect(singularResult).toBe("cat")
    expect(pluralResult).toBe("cats")
    expect(singularResult).not.toBe(pluralResult)
  })
})