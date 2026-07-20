import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return word unchanged when num is 1", () => {
    // Focus on the empty string creating a match for single letter 's'
    // In mutated code, plural("s") would match the misc regex and return "s"
    // In original code, plural("s") would not match misc regex and return "ss"
    expect(plural("s")).toBe("ss")
  })
})