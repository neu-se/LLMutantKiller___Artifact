import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should return 'Ss' for the word 'S' (single uppercase letter)", () => {
    expect(plural("S")).toBe("Ss")
  })
})