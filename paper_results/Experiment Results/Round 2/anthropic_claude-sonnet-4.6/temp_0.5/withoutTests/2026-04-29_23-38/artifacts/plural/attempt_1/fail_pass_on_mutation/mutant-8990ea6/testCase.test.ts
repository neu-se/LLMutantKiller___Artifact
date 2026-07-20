import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should not apply -ies transformation to words containing quy but not ending with quy', () => {
    // "quys" contains "quy" but doesn't end with "quy"
    // Original regex (quy$): won't match "quys", so plural("quys") = "quyss" or falls through
    // Mutated regex (quy without $): matches "quys" because it contains "quy", 
    // so plural("quys") = "quys".substr(0, 3) + "ies" = "quyies"
    const result = plural('quys');
    expect(result).not.toBe('quyies');
  });
});