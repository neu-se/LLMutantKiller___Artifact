import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should pluralize 'roof' to 'roofs' not 'rooves'", () => {
    expect(plural("roof")).toBe("roofs")
  })
})