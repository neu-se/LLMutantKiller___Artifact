import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly transform retain when otherData could be null', () => {
    // Create a delta where retain property returns null via getter
    const otherDelta = new Delta();
    const op: any = { attributes: { bold: true } };
    Object.defineProperty(op, 'retain', {
      get: () => null,
      enumerable: true,
    });
    otherDelta.ops = [op];
    
    const thisDelta = new Delta([{ retain: 3 }]);
    const result = thisDelta.transform(otherDelta, false);
    
    // Original: otherData = null, typeof null === 'object' && null !== null = false
    //           transformedData = length = 1 (Op.length for null retain)
    //           retain(1, {bold:true}) -> [{retain:1, attributes:{bold:true}}]
    // Mutated:  otherData = null, typeof null === 'object' && true = true
    //           transformedData = null
    //           retain(null, {bold:true}) -> [{retain:null, attributes:{bold:true}}]
    expect(result.ops[0]?.retain).toBe(1);
  });
});