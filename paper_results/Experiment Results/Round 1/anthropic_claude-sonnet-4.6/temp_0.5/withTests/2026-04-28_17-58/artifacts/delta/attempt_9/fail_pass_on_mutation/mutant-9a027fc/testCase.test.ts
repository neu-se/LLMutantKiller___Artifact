import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform embed retain (this) against number retain (other) with mismatched embed types uses length', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    // a has embed retain (length=1), b has retain(1) with attributes
    // In transform: thisData={delta:[...]}, otherData=1 (number)
    // Original: typeof 1 === 'object' false → transformedData = length = 1
    // Mutated: true && 1!==null → transformedData = otherData = 1
    // Both give retain(1, attrs) - SAME since 1===length
    
    // Try with b having retain(2) to see if length vs otherData matters
    // a=retain({delta:[...]})(len=1), b=retain(2,{bold:true})
    // length=min(1,2)=1, otherIter.next(1) returns {retain:1} (sliced)
    // otherData=1=length. Still same!
    
    // The ONLY way to get otherData != length is exhausted iterator (Infinity)
    // but that always gets chopped. This mutation may be equivalent.
    
    // Let's test the most direct case from the code
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1, { bold: true });
    const result = a.transform(b, false);
    // transformedData should be 1 (length), not the embed object
    expect(result.ops[0]).toEqual({ retain: 1, attributes: { bold: true } });
    expect(typeof result.ops[0].retain).toBe('number');

    Delta.unregisterEmbed('delta');
  });
});