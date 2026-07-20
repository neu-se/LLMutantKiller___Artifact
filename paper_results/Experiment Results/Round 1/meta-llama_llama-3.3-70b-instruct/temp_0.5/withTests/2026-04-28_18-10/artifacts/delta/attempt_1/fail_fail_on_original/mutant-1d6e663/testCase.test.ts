import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('should test the behavior of the mutated invert function', () => {
    const attr = { a: 1, b: 2, c: 3 };
    const base = { a: 1, b: 2, c: undefined };
    const expected = { a: 1, b: 2, c: null };
    const result = AttributeMap.invert(attr, base);
    expect(result).toEqual(expected);
  });
});