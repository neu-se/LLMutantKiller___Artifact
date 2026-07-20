import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert() with object retain', () => {
  it('should handle null retain object correctly', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const delta = new Delta().retain({ delta: [{ insert: 'b' }] }, { bold: true });
    const base = new Delta().insert({ delta: [{ insert: 'a' }] }, { bold: false });

    const inverted = delta.invert(base);
    const expected = new Delta().retain({ delta: [{ delete: 1 }] }, { bold: false });

    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);

    Delta.unregisterEmbed('delta');
  });
});