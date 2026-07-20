import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 's' as 'ses' following the s-ending rule", () => {
    expect(plural("s")).toBe("ses")
  })
})