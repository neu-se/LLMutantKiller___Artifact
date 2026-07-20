import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        if (keepNull) {
          return new Delta(a).compose(new Delta(b)).ops;
        } else {
          // This will produce different results based on keepNull
          return new Delta(b).ops;
        }
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should correctly handle keepNull parameter in embed composition', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.compose(b);
    // In original code, keepNull should be true (action === 'retain')
    // In mutated code, keepNull is always true
    // This test expects the original behavior where keepNull is conditionally true
    expect(result.ops).toEqual([{ retain: { delta: [{ insert: 'ba' }] } }]);
  });
});