import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('transform function', () => {
  it('should return undefined when the result is an empty object', () => {
    const a: { [key: string]: unknown } = {};
    const b: { [key: string]: unknown } = {};
    const result = AttributeMap.transform(a, b, true);
    expect(result).toBeUndefined();
  });
});