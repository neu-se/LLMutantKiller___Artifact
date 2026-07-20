import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should handle embed transformation with null thisData', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().insert({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);
    expect(result.ops.length).toBe(1);
    expect('retain' in result.ops[0]).toBe(true);
    expect(typeof result.ops[0].retain === 'object' && result.ops[0].retain !== null).toBe(true);
    expect('delta' in result.ops[0].retain!).toBe(true);

    Delta.unregisterEmbed('delta');
  });
});