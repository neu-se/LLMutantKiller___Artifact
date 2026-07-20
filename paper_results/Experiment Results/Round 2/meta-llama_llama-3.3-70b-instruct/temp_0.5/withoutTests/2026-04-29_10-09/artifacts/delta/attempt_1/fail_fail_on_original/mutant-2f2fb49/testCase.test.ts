import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose should handle non-object b correctly', () => {
    const a: AttributeMap = { foo: 'bar' };
    const b = 'not an object';
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual(a);
  });
});