import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embed objects', () => {
  it('should handle non-object otherData correctly', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1, { bold: true });
    const result = a.transform(b, true);
    expect(result.ops.length).toBe(1);
    expect(typeof result.ops[0].retain).toBe('object');
    expect(result.ops[0].attributes).toEqual({ bold: true });

    Delta.unregisterEmbed('delta');
  });
});