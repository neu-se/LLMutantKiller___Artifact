import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose() should handle b being not an object', () => {
    const a = { foo: 'bar' };
    const b = 'string';
    const resultOriginal = AttributeMap.compose(a, b);
    expect(resultOriginal).toEqual(a);
    // Now, let's test the mutated code
    // We can't directly test the mutated code here, but we can test the behavior
    // of the compose function when b is not an object
    const resultMutated = AttributeMap.compose(a, b);
    expect(resultMutated).not.toEqual(a);
  });
});