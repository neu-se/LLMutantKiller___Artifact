import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should return singular form when no num argument is provided", () => {
    expect(plural("cat")).toBe("cat")
    expect(plural("dog")).toBe("dog")
    expect(plural("church")).toBe("church")
  })
})