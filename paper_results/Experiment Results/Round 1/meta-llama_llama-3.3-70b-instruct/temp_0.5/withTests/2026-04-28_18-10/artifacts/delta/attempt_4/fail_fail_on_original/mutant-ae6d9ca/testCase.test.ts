import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('diff function handles non-object input correctly', () => {
    const a = 'string';
    const b = { key: 'value' };
    expect(() => AttributeMap.diff(a, b)).toThrow();
  });
});