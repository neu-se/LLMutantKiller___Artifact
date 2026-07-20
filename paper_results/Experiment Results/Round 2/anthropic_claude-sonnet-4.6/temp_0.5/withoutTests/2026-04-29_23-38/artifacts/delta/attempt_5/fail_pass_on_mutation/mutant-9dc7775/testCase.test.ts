import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should not enter embed handler block when thisData is null even with embed otherData', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    // Construct a delta where thisOp.retain is an object (so peekType returns 'retain')
    // but the object itself is null-ish - use a retain object where the embed key maps to null
    // Actually, we need thisData (thisOp.retain) to be null.
    // OpIterator.peekType checks: typeof op.retain === 'object' which is true for null
    // So { retain: null } will be treated as a retain op by the iterator
    const a = new Delta();
    // Force retain: null - typeof null === 'object' so peekType returns 'retain'
    (a as any).ops = [{ retain: null }];

    const b = new Delta().retain({ image: { src: 'test.png' } });

    // Original: condition false (thisData !== null = false) → skip handler → no throw
    // Mutated: condition true → Object.keys(null) → TypeError
    expect(() => a.transform(b)).not.toThrow();

    Delta.unregisterEmbed('image');
  });
});