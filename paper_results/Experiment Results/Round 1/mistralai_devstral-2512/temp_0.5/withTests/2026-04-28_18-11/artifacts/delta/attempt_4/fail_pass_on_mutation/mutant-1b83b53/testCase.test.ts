import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        const deltaA = new Delta(a);
        const deltaB = new Delta(b);
        return deltaA.compose(deltaB).ops;
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should correctly compose retain embed with number retain', () => {
    const a = new Delta().retain(1, { bold: true });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta()
      .retain({ delta: [{ insert: 'b' }] }, { bold: true })
      .retain(0, { bold: true });
    const result = a.compose(b);
    expect(result).toEqual(expected);
  });
});