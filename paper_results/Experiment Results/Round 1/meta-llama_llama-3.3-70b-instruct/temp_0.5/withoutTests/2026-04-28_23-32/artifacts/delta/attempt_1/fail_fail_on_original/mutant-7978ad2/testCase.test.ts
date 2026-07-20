import { diff } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should handle non-object input correctly in the diff function', () => {
    const a = { foo: 'bar' };
    const b = null;
    const result = diff(a, b);
    expect(result).toEqual({ foo: null });
  });
});