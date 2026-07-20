import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('compose should handle non-object input correctly', () => {
    const a = 'not an object';
    const b = { foo: 'bar' };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ foo: 'bar' });
  });
});