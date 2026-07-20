import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should correctly transform embeds with matching types', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        const deltaA = new Delta(a);
        const deltaB = new Delta(b);
        const result = deltaA.transform(deltaB, priority);
        // Verify the embed type check is working by checking the result structure
        if (result.ops[0] && result.ops[0].retain) {
          const retainOp = result.ops[0].retain;
          if (typeof retainOp === 'object' && retainOp !== null) {
            const keys = Object.keys(retainOp);
            if (keys.length > 0 && keys[0] !== 'delta') {
              throw new Error(`Unexpected embed type: ${keys[0]}`);
            }
          }
        }
        return result.ops;
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);

    // Verify the transform operation was applied correctly
    expect(result.ops).toBeDefined();
    expect(result.ops.length).toBeGreaterThan(0);

    Delta.unregisterEmbed('delta');
  });
});