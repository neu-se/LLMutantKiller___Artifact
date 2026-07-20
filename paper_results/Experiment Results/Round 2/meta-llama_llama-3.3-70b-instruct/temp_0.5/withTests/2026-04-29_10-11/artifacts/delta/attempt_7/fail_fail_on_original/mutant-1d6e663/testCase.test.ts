import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('should detect mutation in invert function', () => {
    const attr = {};
    const base = { a: 1, b: undefined };

    const result = AttributeMap.invert(attr, base);
    expect(Object.keys(result)).toEqual(['a']);
  });
});