import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'Stryker was here' correctly", () => {
    // "Stryker was here" ends in 'e', matches /(fe?$)/i rule
    // w.replace(/(fe?$)/i, 'ves') on "Stryker was here"
    // = "Stryker was her" + "ves" = "Stryker was herves"
    // This should be the same in both original and mutated versions
    // because the fe? rule is added before the bad entry (via unshift, so it's earlier)
    expect(plural("Stryker was here")).toBe("Stryker was herves")
  })
})