import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should correctly pluralize a simple word like 'cat' to 'cats'", () => {
    expect(plural("cat")).toBe("cats")
  })
})