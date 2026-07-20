import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap', () => {
  it('should correctly handle non-object input in diff function', () => {
    const result = AttributeMap.diff('string', { foo: 'bar' });
    expect(result).toEqual({ foo: 'bar' });
  });
});