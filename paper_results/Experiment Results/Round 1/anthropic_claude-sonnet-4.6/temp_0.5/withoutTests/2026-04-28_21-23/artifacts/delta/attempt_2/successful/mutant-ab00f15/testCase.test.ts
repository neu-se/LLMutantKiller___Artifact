import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain with object", () => {
  it("should add a retain op when called with a non-number object argument that coerces to 0", () => {
    // Original guard: typeof length === 'number' && length <= 0
    // For an empty array: typeof [] === 'number' is false => condition false => does NOT return early
    // Mutant guard: true && length <= 0
    // For an empty array: [] <= 0 => 0 <= 0 => true => returns early (no-op)
    const delta = new Delta();
    const embedObj = { image: "url" };
    delta.retain(embedObj);
    // Both original and mutant: typeof {image:'url'} === 'number' is false, {image:'url'} <= 0 is NaN<=0=false
    // So both don't return early. Let me use a different distinguishing input.
    
    // Use a Record that has a numeric string key with value 0
    // Actually, let me use retain with a number 0 and attributes - both return early
    // The real test: retain with an object where object <= 0 is true but typeof object !== 'number'
    
    const delta2 = new Delta();
    // null coerces to 0: null <= 0 is true
    // Original: typeof null === 'number' is false => doesn't return early
    // Mutant: true && null <= 0 => true => returns early
    delta2.retain(null as unknown as Record<string, unknown>);
    expect(delta2.ops.length).toBe(1);
  });
});