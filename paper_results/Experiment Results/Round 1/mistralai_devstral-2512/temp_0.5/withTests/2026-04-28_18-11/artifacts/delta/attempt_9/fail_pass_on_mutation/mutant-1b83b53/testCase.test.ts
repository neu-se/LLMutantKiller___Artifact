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

  it('should correctly handle retain embed composition with attributes when action is retain', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] }, { bold: true });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] }, { italic: true });
    const result = a.compose(b);
    expect(result.ops[0].attributes).toEqual({ bold: true, italic: true });
    expect(result.ops[0].retain).toEqual({ delta: [{ insert: 'ba' }] });
  });
});