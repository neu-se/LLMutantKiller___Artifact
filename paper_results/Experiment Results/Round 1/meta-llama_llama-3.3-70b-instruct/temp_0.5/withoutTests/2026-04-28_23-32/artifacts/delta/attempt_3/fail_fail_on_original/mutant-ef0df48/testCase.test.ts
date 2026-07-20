import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap', () => {
  it('compose should return undefined when b is not an object', () => {
    const a: AttributeMap = { foo: 'bar' };
    const b = 'not an object';
    const keepNull = false;
    const result = AttributeMap.compose(a, b, keepNull);
    if (typeof b !== 'object') {
      expect(result).toBeUndefined();
    }
  });
});