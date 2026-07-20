import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should correctly handle embed type checking during transform', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    // Create a scenario where embed types should match
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);

    // The result should show the transform was applied correctly
    // This tests that the embed type check is working properly
    expect(result.ops.length).toBeGreaterThan(0);
    expect(result.ops[0]).toHaveProperty('retain');

    Delta.unregisterEmbed('delta');
  });
});