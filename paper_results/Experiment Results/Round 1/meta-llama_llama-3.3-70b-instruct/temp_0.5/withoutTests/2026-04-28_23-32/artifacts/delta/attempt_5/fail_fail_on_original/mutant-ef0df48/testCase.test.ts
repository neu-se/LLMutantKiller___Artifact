import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose should return undefined when b is not an object', () => {
    const a: AttributeMap = { foo: 'bar' };
    const b: AttributeMap = null;
    const keepNull = false;
    const result = AttributeMap.compose(a, b, keepNull);
    expect(result).toBeUndefined();
  });
});