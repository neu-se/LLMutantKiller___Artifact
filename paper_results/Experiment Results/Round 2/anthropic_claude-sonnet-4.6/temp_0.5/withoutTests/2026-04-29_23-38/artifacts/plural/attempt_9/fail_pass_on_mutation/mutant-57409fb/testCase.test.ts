import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize when num is NaN", () => {
    // NaN !== 1 is true, so both original and mutated should pluralize
    // But testing boundary: num=1 returns singular
    expect(plural("cat", 1)).toBe("cat")
    // num=NaN should pluralize since NaN !== 1
    expect(plural("cat", NaN)).toBe("cats")
    // num=null should pluralize since null !== 1  
    expect(plural("cat", null as unknown as number)).toBe("cats")
  })
})