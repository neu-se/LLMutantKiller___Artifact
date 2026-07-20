import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.insert with object arg", () => {
  it("should insert an embed object even when it has no length property equal to 0", () => {
    const delta = new Delta();
    // An object (embed) insert should NOT be skipped by the early return guard
    // In the original code: `if (typeof arg === 'string' && arg.length === 0)` 
    // only skips empty strings, not objects.
    // In the mutated code: `if (true && arg.length === 0)` 
    // would skip any arg where arg.length === 0, including objects without a length property
    // (since undefined === 0 is false), BUT more importantly it would also skip
    // objects that happen to have length 0.
    // Actually, let's test with a plain object embed - objects don't have .length
    // so arg.length === 0 would be false for plain objects.
    // The real issue: mutated code uses `true` instead of `typeof arg === 'string'`
    // This means for a string of length 0, both would skip.
    // For a non-string with length 0... let's think about what breaks.
    // 
    // The mutation changes `typeof arg === 'string'` to `true`.
    // So in the mutated code, the condition becomes `true && arg.length === 0`
    // which equals `arg.length === 0`.
    // 
    // For a plain object embed like { image: 'url' }, arg.length is undefined,
    // undefined === 0 is false, so it won't be skipped.
    //
    // But wait - what about inserting an object that has a length property of 0?
    // That would be skipped in mutated but not original.
    //
    // More importantly: in the original, `typeof arg === 'string'` is false for objects,
    // so the guard never triggers for objects. In mutated, `true` means the guard
    // CAN trigger for objects if arg.length === 0.
    //
    // Let's test with an object that has length: 0
    const embedWithLength0 = { video: "url", length: 0 } as any;
    delta.insert(embedWithLength0);
    // In original: typeof embedWithLength0 === 'string' is false, so insert proceeds
    // In mutated: true && embedWithLength0.length === 0 => true && true => true, so returns early
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].insert).toEqual(embedWithLength0);
  });
});