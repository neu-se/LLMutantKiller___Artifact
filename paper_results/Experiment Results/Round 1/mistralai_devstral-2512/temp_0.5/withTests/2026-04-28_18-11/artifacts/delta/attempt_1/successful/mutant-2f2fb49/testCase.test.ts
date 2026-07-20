import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose()', () => {
  it('handles non-object b parameter', () => {
    const a = { color: 'red' };
    const b = "not an object";
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ color: 'red' });
  });
});