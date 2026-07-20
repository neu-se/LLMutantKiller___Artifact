import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should use addRule to add new rules that take precedence", () => {
    const result = plural.addRule('uniquetestword123', 'uniquetestword123_plural')
    expect(result).toBe(plural) // addRule returns plural for chaining
    expect(plural('uniquetestword123')).toBe('uniquetestword123_plural')
  })
})