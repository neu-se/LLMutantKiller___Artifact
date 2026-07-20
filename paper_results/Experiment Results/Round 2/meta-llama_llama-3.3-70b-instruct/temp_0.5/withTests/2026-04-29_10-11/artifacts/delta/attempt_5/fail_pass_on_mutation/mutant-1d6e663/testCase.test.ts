import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('should detect mutation in invert function', () => {
    const attr = { a: 1, b: undefined };
    const base = { a: 1, b: undefined, c: undefined };

    const result = AttributeMap.invert(attr, base);
    expect(result).not.toHaveProperty('c');
  });
});