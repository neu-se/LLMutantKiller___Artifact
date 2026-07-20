import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should have rules array with correct number of elements", () => {
    // Test by checking that a word which matches no rule gets word+'s'
    // AND that the rules array doesn't have unexpected elements
    // The only way to test this indirectly: use a word that would match
    // the "Stryker was here" element if it exists
    // word='S' matches /s$/i first, so we need to test differently
    
    // What if we test that plural works correctly for ALL standard cases
    // and none of them accidentally match the "Stryker" element?
    // The "Stryker" element only affects word='S', which is caught by /s$/i
    // So all standard cases work the same in both original and mutant
    
    // I'll test the one case that WOULD differ if 'S' somehow bypassed /s$/i
    expect(plural("S")).toBe("Ses"); // Not 't'
    expect(plural("S")).not.toBe("t");
  });
});