import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose() should handle b being an object', () => {
    const a = { foo: 'bar' };
    const b = { foo: 'baz' };
    const resultOriginal = AttributeMap.compose(a, b);
    expect(resultOriginal).toEqual({ foo: 'baz' });
    // Now, let's test the mutated code
    const bMutated = { foo: 'baz' };
    const resultMutated = AttributeMap.compose(a, bMutated);
    expect(resultMutated).toEqual(a);
  });
});