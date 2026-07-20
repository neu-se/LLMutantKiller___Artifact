import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should return undefined when the transformed attributes are empty', () => {
    const a: any = { foo: 'bar' };
    const b: any = {};
    const priority = true;
    const result = AttributeMap.transform(a, b, priority);
    expect(result).toEqual({});
  });
});