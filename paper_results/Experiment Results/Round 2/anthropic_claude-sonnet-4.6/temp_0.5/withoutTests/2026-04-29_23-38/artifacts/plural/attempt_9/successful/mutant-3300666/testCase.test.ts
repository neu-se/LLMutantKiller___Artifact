describe("plural", () => {
  it("should initialize rules as an empty array", () => {
    jest.resetModules()

    let initialRulesLength = -1
    const originalUnshift = Array.prototype.unshift

    Array.prototype.unshift = function (...args: unknown[]) {
      if (initialRulesLength === -1 && Array.isArray(args[0])) {
        initialRulesLength = (this as unknown[]).length
      }
      return originalUnshift.apply(this, args as [])
    }

    jest.requireActual('../../../../../../../../../../../subject_repositories/plural/index.js')

    Array.prototype.unshift = originalUnshift

    expect(initialRulesLength).toBe(0)
  })
})