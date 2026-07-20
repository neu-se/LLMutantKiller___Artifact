import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('diff function handles non-object input correctly', () => {
    const a = 'string';
    const b = { key: 'value' };
    const resultOriginal = AttributeMap.diff({}, b);
    const resultMutated = AttributeMap.diff(a, b);
    expect(resultOriginal).toEqual(b);
    expect(resultMutated).not.toEqual(b);
  });
});