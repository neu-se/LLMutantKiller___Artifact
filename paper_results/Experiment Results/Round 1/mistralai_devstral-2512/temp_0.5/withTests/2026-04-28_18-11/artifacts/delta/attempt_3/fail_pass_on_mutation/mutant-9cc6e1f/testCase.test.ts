import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should transform embeds correctly when embed types match', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        const result = new Delta(a).transform(new Delta(b), priority);
        return result.ops;
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ delta: [{ retain: 1 }, { insert: 'b' }] });
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});