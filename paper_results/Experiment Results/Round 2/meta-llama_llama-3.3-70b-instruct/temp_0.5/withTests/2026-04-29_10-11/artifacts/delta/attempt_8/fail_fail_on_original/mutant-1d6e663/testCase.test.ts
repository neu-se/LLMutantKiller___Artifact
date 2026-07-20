import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('should detect mutation in invert function', () => {
    const attr = { a: 1, b: null };
    const base = { a: 1, b: 2, c: 3 };

    const result = AttributeMap.invert(attr, base);
    expect(result).toEqual({ b: 2, c: 3 });
  });
});