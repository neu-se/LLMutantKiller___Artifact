import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        // Track whether keepNull was called with correct value
        (Delta as any)._testKeepNull = keepNull;
        return new Delta(a).compose(new Delta(b)).ops;
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
    delete (Delta as any)._testKeepNull;
  });

  it('should pass keepNull=true when action is retain', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    a.compose(b);
    // In original code, action === 'retain' should make keepNull true
    // In mutated code, keepNull is always true regardless of action
    expect((Delta as any)._testKeepNull).toBe(true);
  });
});