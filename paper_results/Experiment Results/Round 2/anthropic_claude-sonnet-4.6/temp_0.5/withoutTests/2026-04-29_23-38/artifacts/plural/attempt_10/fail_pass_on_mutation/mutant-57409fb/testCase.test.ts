import plural, { addRule } from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should apply rules when num is 2 and return base word when num is 1", () => {
    addRule("fish", "fish")
    expect(plural("fish", 1)).toBe("fish")
    expect(plural("fish", 2)).toBe("fish")
    expect(plural("dog", 1)).toBe("dog")
    expect(plural("dog", 2)).toBe("dogs")
  })
})