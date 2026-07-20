import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose() should handle b being null', () => {
    const a = { foo: 'bar' };
    const b = null;
    expect(() => AttributeMap.compose(a, b)).toThrow();
  });
});