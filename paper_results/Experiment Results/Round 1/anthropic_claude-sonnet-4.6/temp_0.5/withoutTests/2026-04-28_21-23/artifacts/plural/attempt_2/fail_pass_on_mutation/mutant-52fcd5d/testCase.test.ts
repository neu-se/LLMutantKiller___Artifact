import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'odds' as 'odds' (singular noun ending in -s)", () => {
    expect(plural("odds")).toBe("odds")
  })
})