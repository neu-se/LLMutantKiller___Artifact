import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize when num is explicitly undefined", () => {
    const result = plural("cat", undefined as unknown as number)
    expect(result).toBe("cats")
  })
})