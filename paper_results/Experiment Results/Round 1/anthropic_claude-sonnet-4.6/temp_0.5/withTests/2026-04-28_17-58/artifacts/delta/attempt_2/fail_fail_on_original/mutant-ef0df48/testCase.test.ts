import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.compose', () => {
  it('returns the a attributes when b is a non-object primitive', () => {
    const a = { bold: true, color: 'red' };
    // When b is a non-object (string), original enters the if block
    // Mutant skips it with if(false), causing different behavior
    const result = AttributeMap.compose(a, 'string' as any);
    expect(result).toEqual({ bold: true, color: 'red' });
  });
});