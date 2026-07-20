import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert() with object retain', () => {
  it('should process non-null object retain values correctly', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const delta = new Delta().retain({ delta: [{ insert: 'b' }] }, { bold: true });
    const base = new Delta().insert({ delta: [{ insert: 'a' }] }, { bold: false });

    const inverted = delta.invert(base);

    // The mutation changes the condition from `op.retain !== null` to `true`
    // This means the code will now process all object retains, including those that should be skipped
    // The original code should produce a valid inverted delta with the correct structure
    expect(inverted.ops).toHaveLength(1);
    expect(inverted.ops[0]).toHaveProperty('retain');
    expect(inverted.ops[0].retain).toHaveProperty('delta');
    expect(Array.isArray(inverted.ops[0].retain.delta)).toBe(true);

    Delta.unregisterEmbed('delta');
  });
});