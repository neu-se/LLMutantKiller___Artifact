import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should pluralize 'blorf' to 'blorfs' with no special rule matching", () => {
    expect(plural("blorf")).toBe("blorfs")
  })
})