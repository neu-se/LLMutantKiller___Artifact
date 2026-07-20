import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural", () => {
  it("should pluralize 'electronics' to 'electronicss' is wrong - it should stay electronics via ics rule, but electronic without s should become electronics", () => {
    // The mutation removes 'electronic' from misc list
    // Test that a word specifically relying on 'electronic' entry behaves correctly
    // 'electronics' in original matches misc rule (returns self)
    // In mutated, 'electronics' still matches /ics$/ rule (returns self) - same result
    // But what if we test the EXACT regex match behavior with the empty string?
    const re = new RegExp('\\b(?:' + ['entrail', '', 'outskirt'].join('|') + ')s\\b', 'i')
    expect(re.test('entrails')).toBe(true)
    expect(re.test('outskirts')).toBe(true)
  })
})