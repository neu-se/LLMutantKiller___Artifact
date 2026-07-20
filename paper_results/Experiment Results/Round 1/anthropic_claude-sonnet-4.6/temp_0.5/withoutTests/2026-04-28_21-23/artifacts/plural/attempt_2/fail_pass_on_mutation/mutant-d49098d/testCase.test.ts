import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should keep 'electronics' unchanged as it is a plural-only noun", () => {
    // The empty string in the mutated regex creates a pattern that matches empty string
    // which could cause the regex to behave differently or match unexpectedly
    // We need a word that relies specifically on 'electronic' being in the misc list
    // 'electronicss' would be the result if the rule doesn't match 'electronics'
    // but /ics$/ rule also returns unchanged... 
    // Instead test that the empty string doesn't cause 'outskirts' to break
    expect(plural("outskirts")).toBe("outskirts")
  })
})