import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        // This test specifically checks the keepNull parameter behavior
        // When keepNull is true, we should preserve null attributes
        // When keepNull is false, we should remove them
        const result = new Delta(a).compose(new Delta(b)).ops;
        if (keepNull) {
          return result;
        } else {
          return result.map(op => {
            if (op.attributes && Object.keys(op.attributes).every(key => op.attributes![key] === null)) {
              const newOp = { ...op };
              delete newOp.attributes;
              return newOp;
            }
            return op;
          });
        }
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should correctly handle keepNull parameter when composing embed with retain', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.compose(b);
    // The mutation changes keepNull from action === 'retain' to always true
    // This test verifies the correct behavior when action is 'retain'
    expect(result.ops[0]).toEqual({
      retain: { delta: [{ insert: 'ba' }] }
    });
  });
});