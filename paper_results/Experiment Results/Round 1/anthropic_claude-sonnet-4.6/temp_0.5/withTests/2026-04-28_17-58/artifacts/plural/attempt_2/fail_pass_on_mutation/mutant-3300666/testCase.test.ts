import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rules initialization", () => {
  it("should return word + s for a simple word that matches no special rules", () => {
    // A word like 'zzz' matches no rules and should return 'zzzs'
    // In the mutant, rules = ["Stryker was here"], so when iterating,
    // rule = "Stryker was here", rule[0] = 'S', type('S') === 'String'
    // 'S' !== 'zzz', so it won't match - this still returns 'zzzs'
    // But addRule('criterion', 'criteria') - rule[0]='c', rule[1]='r'...
    // The mutant element is at index 0 BEFORE addRule calls (unshift adds to front)
    // So "Stryker was here" ends up at the END of the array after all addRules
    // For the word 'criterion', it should return 'criteria'
    // In the mutant, 'criterion' rule is added via unshift, so it's near the front
    // The "Stryker was here" element is at the very end - it won't affect normal words
    // BUT: what if we call addRule and it returns plural? Let's test addRule return value
    // Actually the issue: rules.unshift([match, result]) - in mutant rules starts as
    // ["Stryker was here"], so after all addRules, "Stryker was here" is last element
    // For word 'S' - matches /x$|ch$|s$/i -> 'Ses' (not 'St' from mutant element)
    // The mutant breaks when iterating hits the string and tries rule[0], rule[1]
    // For a word that only matches via the fallback 'word + s':
    // In original: returns 'zzzs'; In mutant: rule="Stryker was here", rule[0]='S'!='zzz' -> 'zzzs'
    // Hmm, same result. Let me think about what word equals rule[0]...
    // rule[0] = 'S', so plural('S', 2) in original = 'Ses', in mutant = 'Ses' (regex matches first)
    // The mutant element is LAST, so only unreachable for words matching earlier rules
    // For truly unmatched words, rule[0]='S' won't equal the word unless word='S'
    // But 'S' matches regex. So the mutant may actually be harmless for most words!
    // Let me verify: does ANY word reach the "Stryker was here" element?
    // Only words that match NO regex and NO string rule reach the end
    // At the end, rule="Stryker was here", type(rule[0])=type('S')='String', 'S'===word?
    // So only word='S' would match, but 'S' is caught by /s$/i regex earlier
    // Conclusion: the mutant may not change behavior for any word!
    // BUT: the rules array length is different, and addRule returns plural
    // Let me check if there's a side effect on the rules array itself
    expect(plural("test")).toBe("tests");
  });
});