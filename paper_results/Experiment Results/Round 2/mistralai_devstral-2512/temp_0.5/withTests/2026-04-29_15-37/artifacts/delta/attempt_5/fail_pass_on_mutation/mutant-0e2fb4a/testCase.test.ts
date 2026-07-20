import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert() with object retain', () => {
  it('should correctly handle object retain with null value', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const delta = new Delta().retain({ delta: null } as unknown as { delta: Op[] }, { bold: true });
    const base = new Delta().insert({ delta: [{ insert: 'a' }] }, { bold: false });

    const inverted = delta.invert(base);

    // The mutation changes the condition from `op.retain !== null` to `true`
    // This means null values will now be processed differently
    // In the original code, null values should be skipped (resulting in empty delta)
    // In the mutated code, they will be processed (resulting in non-empty delta)
    expect(inverted.ops.length).toBeGreaterThan(0);

    Delta.unregisterEmbed('delta');
  });
});