import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'tropic' by adding 's' to make 'tropics'", () => {
    // 'tropic' doesn't end in 'ics', so the /ics$/ rule won't apply
    // In original: 'tropics' matches the misc regex, so plural('tropics') = 'tropics'
    // In mutated: 'tropic' replaced with '', so 'tropics' won't match misc regex
    // but will fall through to default +s rule giving 'tropicss'
    expect(plural("tropics")).toBe("tropics")
  })
})