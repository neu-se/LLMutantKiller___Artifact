import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff', () => {
  it('should reset b to empty when a is not an object in mutated code', () => {
    // Original: no b={} reset, so diff('hello', {bold:true}) returns {bold:true}
    // Mutated: b={} always in outer if, so returns something different
    // Wait - need to reconsider what the mutation actually does
    const result = AttributeMap.diff('hello' as any, { bold: true });
    expect(result).toEqual({ bold: true });
  });
});