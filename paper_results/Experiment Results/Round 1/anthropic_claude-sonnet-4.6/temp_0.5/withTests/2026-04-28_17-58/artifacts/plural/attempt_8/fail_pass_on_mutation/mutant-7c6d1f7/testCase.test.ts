import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should pluralize words ending in vowel+o with s not es", () => {
    // In original: /[aeiouy]o$/ rule catches these and adds 's'
    // In mutated: this rule is /[^aeiouy]o$/ which would catch consonant+o words
    // and add 's' - overriding the +es rule for consonant+o words
    // BUT the +es rule has higher priority (added later = lower index after unshift)
    // So actually for consonant+o: +es rule fires first in BOTH versions
    // The only detectable difference: a vowel+o word that in mutated code
    // hits the now-duplicated consonant+o→+s rule... but it won't match [^aeiouy]o
    // 
    // UNLESS: I'm wrong about which rule has higher priority!
    // Rule 4 added first: unshift → index 0
    // Rule 5 added second: unshift → rule 4 moves to index 1, rule 5 at index 0
    // So rule 5 (/[^aeiouy]o$/→+es) IS at lower index = higher priority. Confirmed.
    //
    // For mutated: rule 4 = /[^aeiouy]o$/→+s at index 1, rule 5 = /[^aeiouy]o$/→+es at index 0
    // Consonant+o word hits rule 5 (index 0) first → +es. Same as original!
    // Vowel+o word: neither matches → default +s. Same as original!
    //
    // This IS equivalent. But let me try anyway with "studio":
    expect(plural("studio")).toBe("studios");
  });
});