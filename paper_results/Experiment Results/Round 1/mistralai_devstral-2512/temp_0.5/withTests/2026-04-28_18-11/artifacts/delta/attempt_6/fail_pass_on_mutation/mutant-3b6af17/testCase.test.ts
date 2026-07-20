import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should correctly handle embed transformation when thisData is a number', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(5);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });

    const result = a.transform(b, true);
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });

    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toEqual(expected.ops[0]);

    Delta.unregisterEmbed('delta');
  });
});