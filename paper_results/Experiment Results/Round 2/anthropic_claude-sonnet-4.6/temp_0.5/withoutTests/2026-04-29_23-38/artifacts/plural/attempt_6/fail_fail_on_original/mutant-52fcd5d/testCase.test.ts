import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize the word 's' by appending another s", () => {
    expect(plural("s")).toBe("ss")
  })
})