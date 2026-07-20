import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('does not crash when thisOp retain is null and otherOp retain is an embed object', () => {
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    // Create a delta with retain: null directly
    // If OpIterator.peekType uses typeof check (true for null), this reaches the else branch
    // with thisData = null
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta().retain({ image: { src: 'test.png' } });

    // Original: thisData !== null check → false → skip Object.keys(null) → no crash
    // Mutated: true → Object.keys(null) → TypeError
    const result = a.transform(b);
    expect(result).toBeDefined();

    Delta.unregisterEmbed('image');
  });
});