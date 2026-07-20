import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose should handle b as object', () => {
    const a: AttributeMap = { foo: 'bar' };
    const b = { baz: 'qux' };
    const keepNull = false;
    const result = AttributeMap.compose(a, b, keepNull);
    expect(result).toEqual({ baz: 'qux', foo: 'bar' });
  });
});