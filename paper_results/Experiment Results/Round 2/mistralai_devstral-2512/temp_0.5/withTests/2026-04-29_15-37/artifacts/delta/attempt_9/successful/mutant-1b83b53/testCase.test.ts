import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        const deltaA = new Delta(a);
        const deltaB = new Delta(b);
        const composed = deltaA.compose(deltaB);
        // This will only work correctly if keepNull is true for retain actions
        if (keepNull) {
          return composed.ops;
        } else {
          // Force an incorrect result when keepNull is false
          return [{ insert: 'INCORRECT_RESULT' }];
        }
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should pass keepNull=true for retain actions in embed composition', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.compose(b);
    // Should get correct composition result, not INCORRECT_RESULT
    expect(result.ops).not.toEqual([{ insert: 'INCORRECT_RESULT' }]);
    const expected = new Delta().retain({ delta: [{ insert: 'ba' }] });
    expect(result).toEqual(expected);
  });
});