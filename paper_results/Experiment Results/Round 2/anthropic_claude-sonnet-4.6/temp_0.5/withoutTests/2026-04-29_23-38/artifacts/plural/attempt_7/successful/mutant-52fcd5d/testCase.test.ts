import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize the word 's' to 'ses'", () => {
    expect(plural("s")).toBe("ses")
  })
})