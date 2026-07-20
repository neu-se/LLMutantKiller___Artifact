import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'cello' to 'cellos'", () => {
    expect(plural("cello")).toBe("cellos")
  })
})