import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should handle non-object input correctly in the compose function', () => {
    const result1 = AttributeMap.compose({}, {});
    const result2 = AttributeMap.compose({}, 'not an object');
    expect(result1).toEqual(result2);
  });
});