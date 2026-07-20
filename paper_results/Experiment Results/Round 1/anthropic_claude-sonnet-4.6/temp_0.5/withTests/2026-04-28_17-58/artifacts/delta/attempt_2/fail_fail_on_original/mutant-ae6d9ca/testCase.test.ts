import AttributeMap from "../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff', () => {
  it('treats non-object a as empty object, returning undefined when b is also undefined', () => {
    // When a is not an object, original resets a={} and b={}, giving undefined
    // Mutated code only resets b={} but keeps a as string, causing Object.keys on string
    // to return character indices, producing a non-undefined result
    const result = AttributeMap.diff('hello' as any, undefined);
    expect(result).toBeUndefined();
  });
});