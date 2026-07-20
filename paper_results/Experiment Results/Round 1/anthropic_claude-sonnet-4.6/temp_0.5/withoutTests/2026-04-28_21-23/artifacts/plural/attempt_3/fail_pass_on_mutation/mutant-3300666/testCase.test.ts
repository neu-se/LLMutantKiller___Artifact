import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function", () => {
  it("should pluralize 'criterion' to 'criteria'", () => {
    // In mutated code, rules starts with ["Stryker was here"], 
    // rule[0]='S', rule[1]='t'. When word='criterion' is checked against 
    // string rule 'S', it won't match. But the addRule for 'criterion' 
    // uses unshift so it ends up before the bogus entry.
    // However the bogus string iterates as rule[0]='S', rule[1]='t'
    // This should still work... let me verify with a word that IS 'S'
    expect(plural("criterion")).toBe("criteria")
  })
})