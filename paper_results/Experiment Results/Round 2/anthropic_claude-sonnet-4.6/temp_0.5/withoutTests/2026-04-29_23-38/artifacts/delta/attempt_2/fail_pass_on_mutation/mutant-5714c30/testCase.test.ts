import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should not throw when thisOp retain is null-like and otherOp is object retain', () => {
    // When thisData is a number (not object), original skips embed handling
    // Mutated: typeof number === 'object' is false, but number !== null is true
    // So if otherData is object: mutated enters block, Object.keys(number) returns []
    // embedType = undefined, condition false, same result
    
    // The real difference: when thisData IS an object but otherData is NOT
    // Original: both conditions true but otherData not object -> false overall
    // Mutated: typeof thisData === 'object' is true -> enters block regardless!
    // Then Object.keys(otherData) where otherData is a number -> Object.keys(5) = []
    
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b,
    });

    const thisDelta = new Delta().retain({ image: { id: 1 } });
    const otherDelta = new Delta().retain(1); // number retain

    // Original: thisData is object, otherData is number -> condition false, transformedData = length = 1
    // Mutated: typeof thisData === 'object' is TRUE -> enters block
    //          Object.keys(thisData) = ['image'], embedType = 'image'
    //          Object.keys(otherData) where otherData = 1 -> Object.keys(1) = []
    //          'image' !== undefined -> condition false, transformedData stays as 1 (length)
    // Both give retain(1) which gets chopped... 

    const result = thisDelta.transform(otherDelta, false);
    // After chop, retain(1) with no attributes is removed
    expect(result.ops).toEqual([]);

    Delta.unregisterEmbed('image');
  });
});