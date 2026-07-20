import AttributeMap from "../src/AttributeMap";

describe('AttributeMap.compose', () => {
  it('should not include keys from a that have undefined values when b does not have those keys', () => {
    // a has a key 'bold' with value undefined, b does not have 'bold'
    const a: { [key: string]: unknown } = { bold: undefined, color: 'red' };
    const b: { [key: string]: unknown } = { italic: true };
    
    const result = AttributeMap.compose(a, b);
    
    // In the original: bold is undefined in a, so it should NOT be added
    // In the mutated version: bold would be added with value undefined
    expect(result).toEqual({ italic: true, color: 'red' });
    expect(result).not.toHaveProperty('bold');
  });
});