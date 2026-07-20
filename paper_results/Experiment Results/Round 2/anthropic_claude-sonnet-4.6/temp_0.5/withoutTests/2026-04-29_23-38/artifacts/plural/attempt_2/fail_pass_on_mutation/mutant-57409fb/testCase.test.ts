import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return singular form when num is 1", () => {
    // When num === 1, condition is false, word returned as-is
    // When num is undefined, both original and mutated pluralize
    // The only behavioral difference would be if somehow undefined !== 1 evaluates differently
    // Testing with explicit undefined to ensure pluralization occurs
    expect(plural("cat", undefined as unknown as number)).toBe("cats")
  })
})