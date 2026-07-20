import Delta from "../../src/Delta";

describe('transform()', () => {
  it('detects mutation when thisOp is object retain and otherIter is exhausted', () => {
    // When thisIter has an object retain but otherIter is exhausted (returns {retain: Infinity})
    // otherData = Infinity (not an object), length = 1
    // Original: typeof Infinity === 'object' => false => transformedData = length = 1
    // Mutated:  true && Infinity !== null => true => transformedData = otherData = Infinity
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    const a = new Delta().retain({ image: { src: 'a.png' } });
    const b = new Delta(); // empty — otherIter exhausted immediately

    const result = a.transform(b, true);
    // Original: result should be empty delta (no ops, since b has nothing)
    // Mutated: might produce different result
    expect(result).toEqual(new Delta());

    Delta.unregisterEmbed('image');
  });
});