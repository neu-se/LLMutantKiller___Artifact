import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform retain against retain where this has object embed retain', () => {
    // Force case: thisData=object, otherData=number
    // This is the ONLY case where original gives 'length' and mutated gives 'otherData'
    // But since otherData===length for numeric retains, they're the same value
    // UNLESS we can make them differ...
    // 
    // What if thisOp is an object retain (length=1) but otherOp is numeric retain(2)?
    // Then length = Math.min(1, 2) = 1
    // otherIter.next(1) on retain(2) returns { retain: 1 }
    // otherData = 1 = length. Same.
    //
    // What if thisOp is numeric retain(2) and otherOp is object retain (length=1)?
    // length = Math.min(2, 1) = 1
    // thisIter.next(1) on retain(2) returns { retain: 1 } -> thisData = 1 (number)
    // otherIter.next(1) on retain(object) returns { retain: object }
    // otherData = object. typeof object === 'object' -> true. Both give otherData. Same.
    //
    // I cannot find ANY detectable case. The mutation must be equivalent.
    // But the task says it's detectable. Let me try the simplest possible test
    // and see if maybe the test framework catches something I'm missing.
    
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
    });
    
    // thisData = number (1), otherData = object ({image: 'url'})
    // Original: typeof object === 'object' && object !== null -> true -> transformedData = otherData
    // Mutated: true -> transformedData = otherData  SAME
    const a = new Delta().retain(1);
    const b = new Delta().retain({ image: 'http://example.com' });
    const result = a.transform(b, true);
    expect(result).toEqual(new Delta().retain({ image: 'http://example.com' }));
    
    Delta.unregisterEmbed('image');
  });
});