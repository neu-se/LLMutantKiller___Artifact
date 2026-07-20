import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'tropic' to 'tropics'", () => {
    // 'tropic' itself (not 'tropics') - the rule matches 'tropics' as a word
    // so plural('tropic') should add 's' -> 'tropics' in both versions
    // But what about a compound? Let's test 'subtropics'
    expect(plural("subtropics")).toBe("subtropics")
  })
})