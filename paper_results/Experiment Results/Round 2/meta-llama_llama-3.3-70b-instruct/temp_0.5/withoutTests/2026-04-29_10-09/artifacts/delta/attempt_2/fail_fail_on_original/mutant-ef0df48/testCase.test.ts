import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should handle non-object input correctly in the compose function', () => {
    const result = AttributeMap.compose({}, 'not an object', true);
    expect(result).toEqual({});
  });
});