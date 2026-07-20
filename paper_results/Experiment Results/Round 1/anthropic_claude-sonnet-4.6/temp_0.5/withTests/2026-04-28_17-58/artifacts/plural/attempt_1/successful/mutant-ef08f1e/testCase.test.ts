import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural rule for vowel+o ending words', () => {
  it('should add s to words ending with vowel+o but not incorrectly match words with vowel+o in the middle', () => {
    // "voodoo" ends in o+o (vowel+o), should be "voodoos"
    // With original /[aeiouy]o$/ -> matches -> "voodoos"  
    // With mutated /[aeiouy]o/ -> also matches -> "voodoos" (same)
    // Need a word ending in consonant+o that contains vowel+o NOT at end
    // "cocoa" - ends in 'a', not 'o'
    // "cocoon" - ends in 'n'
    // The mutation removes $ so it matches vowel+o ANYWHERE
    // A word like "voodoos" already plural... 
    // What about "tobacco"? t-o-b-a-c-c-o, no vowel directly before final o
    // "volcano" - v-o-l-c-a-n-o, 'a' is at position -3, not adjacent to final 'o'
    // "portfolio" - ends in i+o, both match
    // I need: word where [aeiouy] appears before some 'o' NOT at end of word
    // and the word ends in consonant+'o'
    // "voodoo" has oo at end - both match
    // "tattoo" - t-a-t-t-o-o, ends in o+o - both match
    // What about checking the WRONG result with mutation?
    // With mutation, "heroic" contains 'e'+'r'... no
    // "heroism" - h-e-r-o-i-s-m - contains 'e' then 'r' then 'o'... not adjacent
    // Let me try: does "voodoo" differ? No.
    // ACTUAL DIFFERENCE: word ending in consonant+o that has vowel+o pattern inside
    // "boo" - b+o+o, ends in o+o, both match -> "boos"
    // I think the real observable difference is with a word like "cockatoo"
    // c-o-c-k-a-t-o-o - ends in o+o, both match
    // What about a word ending in consonant+o where an earlier 'o' is preceded by vowel?
    // "voodoo" works. What about "igloo"? i-g-l-o-o ends in o+o, both match.
    // Hmm. Let me reconsider. The mutation changes $ removal.
    // Original: /[aeiouy]o$/ - must end with vowel+o
    // Mutated: /[aeiouy]o/ - just needs vowel+o anywhere
    // For the mutated version to give WRONG result, we need a word that:
    // 1. Does NOT end in vowel+o (so original rule doesn't match)
    // 2. DOES contain vowel+o somewhere (so mutated rule matches)
    // 3. The correct plural is NOT w+'s' (otherwise both give same result)
    // Example: "hero" - h-e-r-o. Does it contain vowel+o? 'e' is at index 1, 'r' at 2, 'o' at 3. Not adjacent.
    // "zero" - z-e-r-o. Same pattern, no adjacent vowel+o.
    // "cameo" - c-a-m-e-o. 'e'+'o' at end. Both match.
    // What about a word ending in consonant+o where the word contains "oo" or "ao" etc. internally?
    // "voodoos" - already has s
    // I think I need to find: word with vowel+o NOT at end, ending in consonant+o
    // where correct plural ≠ word+'s'
    // "cocoon" ends in 'n', not 'o'. Not relevant.
    // "cartoon" ends in 'n'. Not relevant.
    // What if I just verify that a word ending in consonant+o that ALSO has vowel+o 
    // somewhere gets the WRONG rule applied?
    // "voodoo" - ends in o+o. Both match. Same result.
    // I'm going in circles. Let me think differently.
    // The mutation makes the regex match more broadly.
    // Words that end in consonant+o should NOT match /[aeiouy]o$/ 
    // but MIGHT match /[aeiouy]o/ if they have vowel+o internally.
    // Such a word: "portfolio" ends in i+o (vowel+o) - both match anyway.
    // "studio" ends in i+o - both match.
    // I need a word ending in consonant+o with internal vowel+o.
    // "voodoo" ends in o+o (vowel+o) - both match.
    // What about words ending in consonant+o where the consonant is preceded by vowel?
    // Like "virago" - v-i-r-a-g-o. 'a'+'g'+'o'. 'a' is not directly before 'o'.
    // "cargo" - c-a-r-g-o. Same pattern.
    // "mango" - m-a-n-g-o. Same.
    // Hmm. What about "duo"? d-u-o. 'u'+'o' at end. Both match.
    // "ratio" - r-a-t-i-o. 'i'+'o' at end. Both match.
    // I need a word where vowel+'consonant(s)'+'o' at end.
    // Actually wait - what about a word that ends in consonant+o
    // where somewhere in the middle there's vowel+o?
    // Like "voodoo" - but that ends in o+o.
    // What about "taboo"? t-a-b-o-o. Ends in o+o. Both match.
    // "shampoo" - s-h-a-m-p-o-o. Ends in o+o. Both match.
    // What about "cocoa"? Ends in 'a', not 'o'.
    // I think the key insight might be different. Let me re-read the rules.
    // Rules are added with unshift, so later addRule calls go to front.
    // The order matters. The /[aeiouy]o$/ rule is added BEFORE /[^aeiouy]o$/.
    // With mutation /[aeiouy]o/ (no $), this rule now matches words with vowel+o anywhere.
    // But since rules are checked in order (from most recently added to oldest),
    // and many specific rules are added after this one (like 'memo', 'cello', etc.),
    // those specific rules would still take precedence.
    // The question is: does any word that should match a LATER rule (added before this one)
    // now incorrectly match the mutated /[aeiouy]o/ rule?
    // Rules added AFTER /[aeiouy]o$/ (which means they appear BEFORE it in the rules array):
    // - /[^aeiouy]o$/ -> w + 'es'
    // - /(fe?$)/ -> ves
    // - 'criterion', 'bacterium', 'memo', 'cello', 'die', 'goose', 'mouse', 'person', 'chilli'
    // - /^(?:wo)?man$/i
    // - animals, tools, clothes, etc.
    // - /ics$/
    // - uncountable words
    // So if a word matches /[aeiouy]o/ (mutated) but should match /[^aeiouy]o$/ (added after),
    // the /[^aeiouy]o$/ rule takes precedence (it's earlier in array = added later).
    // Wait, rules.unshift means newer rules go to FRONT of array.
    // So iteration order is: most recently added first.
    // The /[aeiouy]o$/ rule is added early (near top of file).
    // Later rules (added after) go to front of array and are checked first.
    // So /[^aeiouy]o$/ is checked BEFORE /[aeiouy]o$/.
    // 
    // For the mutation to matter, we need a word that:
    // 1. Does NOT match any rule added AFTER /[aeiouy]o$/ in the source
    //    (i.e., rules that appear later in source = earlier in array = checked first)
    // 2. Matches /[aeiouy]o/ (mutated) but not /[aeiouy]o$/ (original)
    //
    // Rules added AFTER /[aeiouy]o$/ in source (checked before it):
    // /[^aeiouy]o$/, /(fe?$)/, string rules, /^(?:wo)?man$/, animals, tools, /ics$/, uncountable
    //
    // So I need a word that:
    // - Doesn't end in consonant+o (not /[^aeiouy]o$/)
    // - Doesn't end in f/fe
    // - Isn't a special word
    // - Contains vowel+o but doesn't END in vowel+o
    //
    // Such a word: "voodoos" (already plural, ends in 's')
    // "cocoon" ends in 'n', contains 'oo' (o+o), doesn't end in vowel+o
    // "cartoon" ends in 'n', contains 'oo'
    // "balloon" ends in 'n', contains 'oo' -> b-a-l-l-o-o-n, has 'o'+'o' inside
    // "balloon" -> original: no match for /[aeiouy]o$/ (ends in 'n') -> falls through to default -> "balloons"
    //           -> mutated: matches /[aeiouy]o/ (has 'oo') -> returns "balloon" + 's' = "balloons"
    // Same result! The function just adds 's' in both cases.
    //
    // Hmm. The mutation only matters if the word would get a DIFFERENT result from the matched rule
    // vs the default (word+'s'). Since the matched rule also does word+'s', it's the same!
    //
    // UNLESS the word matches a rule that comes AFTER /[aeiouy]o$/ in the array
    // (i.e., added BEFORE it in source = checked AFTER it).
    // Rules added BEFORE /[aeiouy]o$/ in source:
    // - /[^aeiou]y$|quy$/ -> ies
    // - /x$|ch$|s$/ -> es
    // - nucleus/syllabus/etc -> i
    // - thesis/crisis -> es  
    // - appendix/index -> ices
    //
    // So if a word:
    // 1. Matches /[aeiouy]o/ (mutated) 
    // 2. Would normally fall through to one of these earlier-added rules
    // 3. The result would be different
    //
    // Example: a word ending in 'y' (consonant+y) that also contains vowel+o
    // Like "jockeys" - no. "monkey" - m-o-n-k-e-y. Contains 'o' but not vowel+o adjacent.
    // "donkey" - d-o-n-k-e-y. Same.
    // "joey" - j-o-e-y. Contains 'o'+'e' but not 'vowel'+'o'.
    // Wait, I need [aeiouy] followed by 'o'.
    // "voodoo" ends in 'o', not 'y'.
    // What about a word ending in consonant+y that has vowel+o inside?
    // "booby" - b-o-o-b-y. Contains 'o'+'o'. Ends in 'b'+'y' (consonant+y).
    // Original: /[aeiouy]o$/ doesn't match (ends in 'y'). Falls through.
    //   Eventually hits /[^aeiou]y$/ -> "boobies"
    // Mutated: /[aeiouy]o/ matches (has 'oo')! Returns "booby" + 's' = "boobys"
    // DIFFERENT RESULT! "boobies" vs "boobys"
    //
    // But wait, I need to check rule ordering more carefully.
    // /[^aeiou]y$/ is added FIRST (source line ~14), so it's at the END of the rules array.
    // /[aeiouy]o$/ is added later (source line ~24), so it's BEFORE /[^aeiou]y$/ in the array.
    // Iteration goes from index 0 (most recent) to end (oldest).
    // So /[aeiouy]o$/ is checked BEFORE /[^aeiou]y$/.
    //
    // For "booby":
    // Original /[aeiouy]o$/: does "booby" end in vowel+o? No, ends in 'b'+'y'. No match.
    // Falls through to /[^aeiou]y$/: ends in 'b'+'y'. Match! Returns "boobies".
    //
    // Mutated /[aeiouy]o/: does "booby" contain vowel+o? "boo" has 'o'+'o'. Yes! Match!
    // Returns "booby" + 's' = "boobys".
    //
    // So plural('booby') should be "boobies" with original, "boobys" with mutated!
    expect(plural('booby')).toBe('boobies');
  });
});