import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural -ics rule with end anchor", () => {
  it("should pluralize a word that contains 'ics' but does not end with 'ics'", () => {
    // The original regex /ics$/i only matches words ending in 'ics'
    // The mutated regex /ics/i matches any word containing 'ics' anywhere
    // A word like 'topicss' is contrived, but 'acousticstore' contains 'ics' not at end
    // More naturally: a word ending in 'ics' followed by more letters
    // e.g., 'topicscape' - contains 'ics' but doesn't end with 'ics'
    // Original: no match on /ics$/ -> falls through -> 'topicscapes'
    // Mutated: matches /ics/ -> returns 'topicscape' unchanged
    expect(plural("topicscape")).toBe("topicscapes");
  });
});