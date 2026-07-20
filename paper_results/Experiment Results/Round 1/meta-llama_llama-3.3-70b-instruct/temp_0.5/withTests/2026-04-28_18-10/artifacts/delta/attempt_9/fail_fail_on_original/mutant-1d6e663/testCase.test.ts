import * as AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('should test the behavior of the mutated invert function', () => {
    const attr = { a: 1, b: 2, c: 3 };
    const base = { a: 1, b: 2, c: undefined };
    const result = AttributeMap.AttributeMap.invert(attr, base);
    expect(Object.keys(result)).toEqual(['c']);
    expect(result.c).toBe(null);
  });
});