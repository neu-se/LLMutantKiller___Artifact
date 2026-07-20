import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('transforms embed retain when thisData is null and otherData is object', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(null);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toHaveProperty('retain', { delta: [{ insert: 'b' }] });

    Delta.unregisterEmbed('delta');
  });
});