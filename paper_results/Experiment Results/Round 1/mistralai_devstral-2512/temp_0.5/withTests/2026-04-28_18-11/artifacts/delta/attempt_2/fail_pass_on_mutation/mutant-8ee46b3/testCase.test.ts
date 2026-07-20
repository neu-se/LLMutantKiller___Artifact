import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('transforms embed retain without priority', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, false);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});