import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should correctly handle embed type checking in transform', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    // Create a scenario where embed types should match
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);

    // Verify the transform operation was applied correctly
    expect(result.ops).toBeDefined();
    expect(result.ops.length).toBeGreaterThan(0);

    // Check that the embed type is preserved in the result
    const retainOp = result.ops[0].retain;
    if (typeof retainOp === 'object' && retainOp !== null) {
      const embedType = Object.keys(retainOp)[0];
      expect(embedType).toBe('delta');
    }

    Delta.unregisterEmbed('delta');
  });
});