import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain", () => {
  it("should add a retain op when called with an object embed, not skip it due to coercion", () => {
    // The mutation changes `typeof length === 'number' && length <= 0`
    // to `true && length <= 0`.
    // For an object embed retain, the original never returns early (typeof obj !== 'number').
    // With the mutation, `true && obj <= 0` = `true && (NaN <= 0)` = false for plain objects.
    // 
    // However, for `null as any`: null <= 0 is true (null coerces to 0).
    // Original: typeof null === 'number' = false -> does NOT return early -> pushes op
    // Mutated: true && null <= 0 = true && true = true -> returns early (no op)
    const delta = new Delta();
    (delta as any).retain(null);
    expect(delta.ops).toHaveLength(1);
  });
});