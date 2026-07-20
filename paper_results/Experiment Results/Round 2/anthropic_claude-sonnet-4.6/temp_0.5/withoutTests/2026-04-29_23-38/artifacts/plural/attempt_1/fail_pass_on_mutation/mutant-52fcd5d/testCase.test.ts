import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should correctly pluralize 'tropic' to 'tropics'", () => {
    expect(plural("tropics")).toBe("tropics")
  })
})