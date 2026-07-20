import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert() with object retain', () => {
  it('should skip null object retain values during inversion', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    // Create a delta with a null object retain
    const ops: Op[] = [
      { retain: { delta: null } as unknown as { delta: Op[] }, attributes: { bold: true } },
      { retain: { delta: [{ insert: 'b' }] }, attributes: { bold: true } }
    ];
    const delta = new Delta(ops);
    const base = new Delta().insert({ delta: [{ insert: 'a' }] }, { bold: false });

    const inverted = delta.invert(base);

    // The mutation changes the condition from `op.retain !== null` to `true`
    // This means the original code should skip the null retain (resulting in 1 op)
    // The mutated code will process the null retain (resulting in 2 ops)
    expect(inverted.ops.length).toBe(1);

    Delta.unregisterEmbed('delta');
  });
});