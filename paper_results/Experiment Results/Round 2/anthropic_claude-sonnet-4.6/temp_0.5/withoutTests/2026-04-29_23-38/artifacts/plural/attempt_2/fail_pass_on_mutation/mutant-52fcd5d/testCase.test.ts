import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return 'tropics' unchanged when pluralizing 'tropics'", () => {
    expect(plural("tropics")).toBe("tropics")
  })
})