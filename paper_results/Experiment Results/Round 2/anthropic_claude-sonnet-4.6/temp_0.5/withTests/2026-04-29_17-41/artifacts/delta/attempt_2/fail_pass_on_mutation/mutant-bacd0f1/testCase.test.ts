import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() mutation detection', () => {
  it('detects mutation when this has embed retain and other is exhausted', () => {
    // this has an embed retain, other has nothing (exhausted → Infinity retain)
    // otherData = Infinity, typeof Infinity !== 'object', Infinity !== null
    // Original: transformedData = length = 1
    // Mutated: transformedData = Infinity
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });
    
    const a = new Delta().retain({ image: 'foo' });
    const b = new Delta(); // empty - other is exhausted
    
    // When b is empty, transform should return empty delta
    const result = a.transform(b, true);
    const expected = new Delta();
    
    Delta.unregisterEmbed('image');
    expect(result).toEqual(expected);
  });
});