import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should return the correct result when transforming attributes', () => {
    const a: any = { foo: 'bar' };
    const b: any = { foo: 'baz' };
    const priority = true;
    const result = AttributeMap.transform(a, b, priority);
    expect(result).toEqual({ foo: 'baz' });
  });
});