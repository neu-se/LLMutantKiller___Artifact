import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe("AttributeMap.compose", () => {
  it("should not include keys from a that are explicitly undefined when b does not have them", () => {
    // In the original code, the condition is:
    // if (a[key] !== undefined && b[key] === undefined)
    // This means: only copy a[key] into attributes if a[key] is NOT undefined AND b doesn't have the key
    //
    // In the mutated code, the condition is:
    // if (true && b[key] === undefined)
    // This means: always copy a[key] into attributes if b doesn't have the key,
    // even when a[key] is undefined
    //
    // We can detect this by having a key in `a` with value `undefined`.
    // Original: won't add the key (since a[key] === undefined fails the check)
    // Mutated: will add the key with value undefined (since `true` passes)
    //
    // However, since undefined values in objects are tricky, let's think of another approach:
    // If a has a key with a defined value and b doesn't have that key,
    // both original and mutated will copy it. That's not the differentiator.
    //
    // The key difference: when a[key] is undefined and b[key] is undefined (b doesn't have the key)
    // Original: skips (a[key] !== undefined is false)
    // Mutated: sets attributes[key] = undefined
    //
    // But setting undefined on an object means Object.keys won't include it...
    // Actually, `attributes[key] = undefined` DOES add the key to the object,
    // but Object.keys will still include it. Let's verify this logic.
    //
    // Actually wait - if attributes[key] = undefined, then Object.keys(attributes) will include that key
    // and the result won't be undefined (the function returns the object).
    // But the returned object will have a key with value undefined.
    //
    // Let's construct a test: a has a key with undefined value, b is empty
    // Original: the key is not added to attributes, result is undefined (empty object)
    // Mutated: the key IS added with undefined value, result is { key: undefined } which has length > 0
    
    const a: AttributeMap = {};
    // We need to set a key to undefined explicitly
    (a as any)['someKey'] = undefined;
    const b: AttributeMap = {};
    
    const result = AttributeMap.compose(a, b);
    
    // Original: a[key] !== undefined fails, so key not added, result is undefined
    // Mutated: true passes, attributes['someKey'] = undefined is set,
    //          Object.keys(attributes) includes 'someKey', so result is { someKey: undefined }
    expect(result).toBeUndefined();
  });
});