import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';
import Op from '../../../../../../../../../../../subject_repositories/delta/src/Op';

describe('transform() with embeds', () => {
  it('should handle transform when thisData is a number and otherData is an embed', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);
    expect(result.ops[0].retain).toEqual({ delta: [{ insert: 'b' }] });
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].attributes).toBeUndefined();
    expect(result.length()).toBe(1);

    Delta.unregisterEmbed('delta');
  });
});