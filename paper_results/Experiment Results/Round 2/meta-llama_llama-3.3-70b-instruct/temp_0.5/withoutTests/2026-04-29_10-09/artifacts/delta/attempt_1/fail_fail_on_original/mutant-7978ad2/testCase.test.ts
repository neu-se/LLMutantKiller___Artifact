import { diff } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should handle non-object input correctly in diff function', () => {
    const a = { foo: 'bar' };
    const b = 'not an object';
    const result = diff(a, b);
    expect(result).toEqual({ foo: null });
  });
});