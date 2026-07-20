import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize when called without a number argument", () => {
    expect(plural("cat")).toBe("cats")
    expect(plural("dog")).toBe("dogs")
    expect(plural("church")).toBe("churches")
  })
})