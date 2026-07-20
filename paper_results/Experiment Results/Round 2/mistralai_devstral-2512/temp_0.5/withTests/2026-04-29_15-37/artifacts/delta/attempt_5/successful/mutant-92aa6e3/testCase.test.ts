import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        // Track the keepNull value for testing
        (Delta as any)._lastKeepNull = keepNull;
        return new Delta(a).compose(new Delta(b)).ops;
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
    delete (Delta as any)._lastKeepNull;
  });

  it('should pass keepNull=false when action is insert', () => {
    const a = new Delta().insert({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    a.compose(b);
    // In original code, when action is 'insert', keepNull should be false
    // In mutated code, keepNull is always true
    expect((Delta as any)._lastKeepNull).toBe(false);
  });
});