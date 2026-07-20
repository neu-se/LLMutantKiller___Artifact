import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should pluralize words ending in vowel+o with 's' not 'es'", () => {
    // "video" ends in 'eo' (vowel + o), should get 's' → "videos"
    // With original regex /[aeiouy]o$/i: matches 'eo' at end → "videos"
    // With mutated regex /[aeiouy]o/i: also matches → "videos" (same)
    
    // Need a word where mutation causes different behavior
    // A word ending in consonant+o that contains vowel+o NOT at end
    // "voodoo" ends in 'oo' - both match
    // Try "tattoo" - ends in 'oo', both match
    
    // The key: mutation removes $ so it matches mid-word
    // Word like "tomato" - t,o,m,a,t,o - no vowel before any 'o'? 
    // position 1: 'o' preceded by 't' (consonant)
    // position 5: 'o' preceded by 't' (consonant)  
    // So "tomato" doesn't match either version → goes to consonant+o rule → "tomatoes"
    
    // What about "avocado"? a,v,o,c,a,d,o
    // vowel+o: position 2 'o' preceded by 'v' (consonant), position 6 'o' preceded by 'd' (consonant)
    // No match for either version
    
    // "volcano" - v,o,l,c,a,n,o - no vowel+o
    // "casino" - c,a,s,i,n,o - no vowel+o  
    // "piano" - p,i,a,n,o - no vowel+o
    
    // "cameo" - c,a,m,e,o - 'e' before 'o' at end → matches both
    // "rodeo" - r,o,d,e,o - 'e' before final 'o' → matches both
    //   BUT also 'o' at position 1 preceded by 'r' (consonant) - no issue
    
    // I need a word ending in consonant+o where there's ALSO a vowel+o BEFORE the end
    // Like "voodoo" but where the final char is NOT part of vowel+o
    // "oboe" ends in 'e' not 'o'
    
    // What about a compound: "portfolio" ends in 'io' - both match
    
    // Let me try "cockatoo" - c,o,c,k,a,t,o,o
    // ends in 'oo' → vowel+o at end → both match → "cockatoos"
    
    // Hmm. What about words where mutation causes it to match the WRONG rule?
    // The rules are added with unshift, so later-added rules have higher priority
    // The stereo rule /[aeiouy]o$/i is added, then /[^aeiouy]o$/i
    // With unshift, /[^aeiouy]o$/i is checked FIRST (higher index in array = added later = unshifted to front)
    
    // Wait - rules.unshift means the LAST added rule is FIRST checked
    // So /[^aeiouy]o$/ is added AFTER /[aeiouy]o$/, so it's checked first
    // For "tomato": /[^aeiouy]o$/ matches → "tomatoes" ✓
    // For "video": /[^aeiouy]o$/ doesn't match, /[aeiouy]o$/ matches → "videos" ✓
    
    // With mutation /[aeiouy]o/i (no $):
    // For "tomato": /[^aeiouy]o$/ checked first - matches! → "tomatoes" (same)
    // Hmm, so "tomato" would still work because consonant+o rule is checked first
    
    // For a word like "voodoo": /[^aeiouy]o$/ - last char 'o' preceded by 'o' (vowel) - NO match
    // Then /[aeiouy]o$/: 'oo' at end - matches → "voodoos" with original
    // With mutation /[aeiouy]o/: also matches → "voodoos" (same)
    
    // I need a word where:
    // 1. Does NOT end in vowel+o (so original /[aeiouy]o$/ doesn't match)
    // 2. But DOES contain vowel+o somewhere (so mutated /[aeiouy]o/ matches)
    // 3. The consonant+o rule would give different result
    
    // Word ending in consonant+o, containing vowel+o inside:
    // "oboe" - no, ends in 'e'
    // Need: ...vowel+o...consonant+o (end)
    // Like: "voodoo" - no, ends in vowel+o
    // "folio" ends in 'io' - vowel+o - both match
    
    // What about "portfolio"? ends in 'io' - both match → "portfolios"
    
    // I think I need: a word ending in consonant+o that has a vowel+o pattern inside
    // "oblong" - no 'o' at end
    // "voodoo" - ends in vowel+o
    
    // Let me think of real words: "cocoa" ends in 'a'. 
    // "bozo" - b,o,z,o - ends in 'zo' (consonant+o), contains 'oz' not vowel+o... 'o' at pos 1 preceded by 'b'
    // Wait: "bozo" - is there vowel+o? b-o-z-o. The 'o' at position 3 is preceded by 'z' (consonant). The 'o' at position 1 is preceded by 'b' (consonant). No vowel+o. 
    
    // "voodoo" = v-o-o-d-o-o: positions of 'o': 1,2,4,5
    // 'o' at pos 2 preceded by 'o' (vowel) ✓ → matches /[aeiouy]o/
    // ends in 'oo' → matches /[aeiouy]o$/ too
    // Both versions match → same result
    
    // I'm struggling to find a natural word. Let me reconsider.
    // 
    // Actually wait - what about a word that ends in consonant+o but has "eo", "ao", "io", "oo", "uo", "yo" somewhere in the middle?
    // "geode" - no 'o' at end
    // "people" - no
    // "leopard" - no
    // 
    // How about "oboe"? o-b-o-e. Ends in 'e'. Not relevant.
    //
    // "cockatoo" = c-o-c-k-a-t-o-o: ends in 'oo' (vowel+o) - both match
    //
    // What about "taboo"? t-a-b-o-o: ends in 'oo' - both match
    //
    // Hmm. Let me look at this differently.
    // The mutation makes /[aeiouy]o/i match mid-word.
    // But /[^aeiouy]o$/i is checked FIRST (added later, unshifted to front).
    // So for words ending in consonant+o, the consonant rule fires first regardless.
    // The mutation only matters for words where:
    //   - consonant+o$ rule does NOT match (word doesn't end in consonant+o)
    //   - vowel+o$ rule does NOT match (word doesn't end in vowel+o)  
    //   - but vowel+o rule WITHOUT $ DOES match (word contains vowel+o somewhere)
    //
    // This means: words NOT ending in 'o' at all, but containing vowel+o inside
    // Like "poet", "poem", "goes", "does", "toes", "foes", "hoe", "toe", "doe"
    // Wait - these end in 'e' or other letters, not 'o'
    //
    // "poet" - p-o-e-t: contains 'oe' not 'eo'... wait, does it contain vowel+o?
    // 'o' at pos 1 preceded by 'p' (consonant). No vowel+o.
    //
    // "poem" - p-o-e-m: 'o' preceded by 'p'. No.
    //
    // "goes" - g-o-e-s: 'o' preceded by 'g'. No.
    //
    // "voodoo" already analyzed - ends in 'oo'.
    //
    // "igloo" - i-g-l-o-o: ends in 'oo'. Both match.
    //
    // "shampoo" - s-h-a-m-p-o-o: ends in 'oo'. Both match.
    //
    // What about words ending in something other than 'o' that contain vowel+o?
    // With mutation, these would incorrectly get '+s' treatment!
    //
    // "book" - b-o-o-k: contains 'oo' (vowel+o)! Ends in 'k'.
    // Original: no 'o' rule matches → falls through to default → "books"  
    // Mutated: /[aeiouy]o/i matches 'oo' in "book" → returns "book" + 's' = "books"
    // Same result! Both give "books".
    //
    // "cook" → "cooks" in both. Same.
    //
    // Hmm, the function returns `w + 's'` which is the same as the default.
    // So for most words, mutation won't matter because the result is the same.
    //
    // The mutation WOULD matter for words where:
    // - The word contains vowel+o (not at end)
    // - The word would normally match a DIFFERENT rule
    // - That different rule gives a different result than '+s'
    //
    // For example, a word ending in 'x' or 'ch' or 's' (gets '+es') that contains vowel+o inside
    // But wait - those rules are added AFTER the 'o' rules, so they'd be checked FIRST (unshift)
    //
    // Let me trace the rule order more carefully.
    // Rules are added with unshift, so the LAST addRule call is at index 0 (checked first).
    // 
    // Order of addRule calls (first to last):
    // 1. /[^aeiou]y$|quy$/i
    // 2. /x$|ch$|s$/i  
    // 3. /nucleus|syllabus.../i
    // 4. /thesis|crisis/i
    // 5. /appendix|index/i
    // 6. /[aeiouy]o$/i  ← ORIGINAL (stereo rule)
    // 7. /[^aeiouy]o$/i
    // 8. /(fe?$)/i
    // 9. 'criterion' → 'criteria'
    // ... many string rules ...
    // 10. /^(?:wo)?man$/i
    // 11. /\b(?:bison|cod|...)\b/i
    // 12. tools/clothes/games regex
    // 13. /ics$/i
    // 14. /\b(?:tea|sugar|...)\b/i
    //
    // After all unshifts, rule 14 is at index 0, rule 1 is at the end.
    // So checking order: 14, 13, 12, 11, 10, ..., 8, 7, 6, 5, 4, 3, 2, 1
    //
    // The 'o' rules (6 and 7) are checked AFTER rules 8-14 but BEFORE rules 1-5.
    // Actually wait: rule 7 (/[^aeiouy]o$/) is added AFTER rule 6 (/[aeiouy]o$/),
    // so rule 7 is at a lower index (closer to 0) than rule 6.
    // Rule 7 is checked BEFORE rule 6.
    //
    // So for a word ending in consonant+o: rule 7 fires first → correct
    // For a word ending in vowel+o: rule 7 doesn't match, rule 6 fires → correct
    //
    // With mutation (rule 6 becomes /[aeiouy]o/i without $):
    // Rule 7 is still checked before rule 6.
    // For words ending in consonant+o: rule 7 fires → same as before
    // For words ending in vowel+o: rule 7 doesn't match, mutated rule 6 matches → same result (w+'s')
    // For words NOT ending in 'o' but containing vowel+o: 
    //   - Rules 14-8 checked first
    //   - Rule 7 (/[^aeiouy]o$/) doesn't match (doesn't end in consonant+o)
    //   - Mutated rule 6 (/[aeiouy]o/i) MATCHES if word contains vowel+o
    //   - Returns w + 's'
    //   - But original rule 6 (/[aeiouy]o$/i) doesn't match → falls to rules 5,4,3,2,1 or default
    //
    // So I need a word that:
    // 1. Doesn't end in 'o'
    // 2. Contains vowel+o somewhere
    // 3. Would normally (without mutation) get a different plural than w+'s'
    //   OR would fall through to default (w+'s') - in which case results are the same
    //
    // For case 3 to give different results, the word must match one of rules 1-5:
    // Rule 5: /appendix|index/i → +'ices'
    // Rule 4: /thesis|crisis/i → +'es' (remove last 2, add 'es')
    // Rule 3: /nucleus|syllabus|focus|fungus|cactus/i → remove last 2, add 'i'
    // Rule 2: /x$|ch$|s$/i → +'es'
    // Rule 1: /[^aeiou]y$|quy$/i → remove y, add 'ies'
    //
    // A word matching rule 2 (/x$|ch$|s$/i) that contains vowel+o:
    // - Ends in 'x', 'ch', or 's' AND contains vowel+o
    // - Like "fox" - f-o-x: 'o' preceded by 'f' (consonant). No vowel+o.
    // - "coax" - c-o-a-x: contains 'oa'... 'a' preceded by 'o' (vowel), but we need vowel+o not vowel+vowel
    //   Wait: does "coax" contain vowel+o? c-o-a-x: 'o' at pos 1 preceded by 'c' (consonant). No.
    // - "brooch" - b-r-o-o-c-h: contains 'oo' (vowel+o)! Ends in 'ch' → rule 2 → "brooches"
    //   With original: rule 7 no (ends in 'ch'), rule 6 no (doesn't end in 'o'), rule 5 no, rule 4 no, rule 3 no, rule 2 YES → "brooches"
    //   With mutation: rule 7 no, mutated rule 6 YES (contains 'oo') → "broochs"
    //   DIFFERENT! "brooches" vs "broochs"
    //
    // "brooch" is the word! Let me verify:
    // "brooch" = b-r-o-o-c-h
    // Contains 'oo' where first 'o' is a vowel followed by 'o' → matches /[aeiouy]o/i
    // Ends in 'ch' → matches /x$|ch$|s$/i → should give "brooches"
    // Rule checking order: 14,13,12,11,10,...,8,7,6,5,4,3,2,1
    // Rule 7 (/[^aeiouy]o$/): "brooch" ends in 'h', not 'o' → no match
    // Original rule 6 (/[aeiouy]o$/): ends in 'h' → no match → continues to rule 2
    // Rule 2 (/x$|ch$|s$/): ends in 'ch' → match → "brooches" ✓
    // 
    // Mutated rule 6 (/[aeiouy]o/i): contains 'oo' → MATCH → returns "brooch" + 's' = "broochs" ✗
    //
    // This is the test case!

    expect(plural("brooch")).toBe("brooches");
  });
});