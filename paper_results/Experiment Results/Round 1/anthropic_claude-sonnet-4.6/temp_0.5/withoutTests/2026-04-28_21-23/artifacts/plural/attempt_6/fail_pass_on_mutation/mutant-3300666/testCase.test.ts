import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should pluralize 'blort' to 'blorts' with no special rule matching", () => {
    expect(plural("blort")).toBe("blorts")
  })
})