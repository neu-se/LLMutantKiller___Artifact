import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('compose() with embeds', () => {
  it('should correctly handle retain embed with insert embed', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().insert({ delta: [{ insert: 'b' }] });
    const expected = new Delta().insert({ delta: [{ insert: 'b' }] }).retain({ delta: [{ insert: 'a' }] });
    const result = a.compose(b);

    Delta.unregisterEmbed('delta');
    expect(result).toEqual(expected);
  });
});