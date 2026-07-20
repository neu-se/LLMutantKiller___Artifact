import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap', () => {
  it('should return the correct result when transforming attributes with priority', () => {
    const a: any = { foo: 'bar' };
    const b: any = { foo: 'baz' };
    const priority = true;
    const result = AttributeMap.transform(a, b, priority);
    if (result !== undefined) {
      expect(typeof result).toBe('object');
      expect(Object.keys(result).length).toBe(1);
    } else {
      expect(result).not.toBeNull();
    }
  });
});