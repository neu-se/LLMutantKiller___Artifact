import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embed objects', () => {
  it('should correctly transform when thisData is object and otherData is number', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1);
    const result = a.transform(b, true);
    expect(result.ops.length).toBeGreaterThan(0);
    expect(result.ops[0]).toHaveProperty('retain');
    expect(result.ops[0].retain).toEqual({ delta: [{ insert: 'a' }] });

    Delta.unregisterEmbed('delta');
  });
});