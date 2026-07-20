import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should pluralize 'hat' to 'hats'", () => {
    expect(plural("hat")).toBe("hats")
  })
})