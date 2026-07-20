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

  it('should correctly compose retain embed with number retain and preserve attributes', () => {
    const a = new Delta().retain(1, { bold: true });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.compose(b);
    expect(result.ops[0].attributes).toEqual({ bold: true });
    expect(result.ops[0].retain).toEqual({ delta: [{ insert: 'b' }] });
    expect(result.ops[1]).toEqual({ retain: 0, attributes: { bold: true } });
  });
});