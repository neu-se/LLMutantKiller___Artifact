import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        const deltaA = new Delta(a);
        const deltaB = new Delta(b);
        const composed = deltaA.compose(deltaB);
        return composed.ops;
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should correctly handle embed composition with attributes', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] }, { bold: true });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] }, { italic: true });
    const result = a.compose(b);
    const expected = new Delta().retain({ delta: [{ insert: 'ba' }] }, { bold: true, italic: true });
    expect(result).toEqual(expected);
  });
});