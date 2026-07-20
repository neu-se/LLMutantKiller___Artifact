import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'tropic' correctly", () => {
    expect(plural("tropics")).toBe("tropics")
  })
})