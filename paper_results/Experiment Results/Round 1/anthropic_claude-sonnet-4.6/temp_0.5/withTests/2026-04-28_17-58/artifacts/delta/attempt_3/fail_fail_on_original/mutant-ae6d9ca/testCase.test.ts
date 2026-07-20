import AttributeMap from "../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.diff', () => {
  it('treats non-object a as empty object when a is a non-object type', () => {
    // Original: resets both a={} and b={} when a is not an object, so diff({},{}) = undefined
    // Mutated: only resets b={}, keeps a as string, Object.keys('hello') returns char indices
    const result = AttributeMap.diff('hello' as any, undefined);
    expect(result).toBeUndefined();
  });
});