import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta insert with object arg", () => {
  it("should allow inserting an object (embed) even when it has no length property returning 0", () => {
    const delta = new Delta();
    // In the original code, only empty strings are skipped.
    // In the mutated code, `if (true && arg.length === 0)` is evaluated,
    // which means when arg is an object (embed), arg.length is undefined,
    // and undefined === 0 is false, so it proceeds normally.
    // BUT when arg is an empty string "", arg.length === 0 is true,
    // so both original and mutated skip empty strings.
    //
    // The key difference: with the mutation `if (true && arg.length === 0)`,
    // if we pass an object that happens to have a `length` property equal to 0,
    // the mutated code would skip it (return early), but the original code would NOT
    // skip it (because typeof arg !== 'string').
    //
    // Let's create an object with length === 0:
    const embedWithLength = { image: "url" } as Record<string, unknown>;
    // Plain objects don't have length, so let's use one that does
    // Actually, we need to test with an object that has length === 0
    // The mutation changes `typeof arg === 'string' && arg.length === 0`
    // to `true && arg.length === 0`
    // For a plain object like { image: "url" }, arg.length is undefined,
    // undefined === 0 is false, so both behave the same.
    //
    // We need an object where arg.length === 0 to expose the difference.
    // Let's create such an object:
    const embedWithZeroLength = Object.assign({ image: "url" }, { length: 0 });
    
    const result = new Delta().insert(embedWithZeroLength);
    
    // Original: typeof arg === 'string' is false for object, so condition is false,
    //           insert proceeds, ops should have one element
    // Mutated:  true && arg.length === 0 => true && true => true,
    //           returns early, ops should be empty
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].insert).toEqual(embedWithZeroLength);
  });
});