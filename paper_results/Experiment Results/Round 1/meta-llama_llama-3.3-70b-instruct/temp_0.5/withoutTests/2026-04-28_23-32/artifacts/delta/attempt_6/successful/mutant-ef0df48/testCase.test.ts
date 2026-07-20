import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose should handle non-object b correctly', () => {
    const a: AttributeMap = { foo: 'bar' };
    const b = 'not an object';
    const keepNull = false;
    // In the original code, if b is not an object, it should return undefined.
    // In the mutated code, if b is not an object, it should still execute the rest of the function.
    const result = AttributeMap.compose(a, b, keepNull);
    expect(Object.keys(result)).toEqual(['foo']);
  });
});