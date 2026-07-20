import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'electronics' correctly", () => {
    // 'electronic' is in the misc array, so 'electronics' should remain 'electronics'
    // In the mutated code, 'electronic' is replaced with '' which breaks this rule
    expect(plural("electronics")).toBe("electronics")
  })
})