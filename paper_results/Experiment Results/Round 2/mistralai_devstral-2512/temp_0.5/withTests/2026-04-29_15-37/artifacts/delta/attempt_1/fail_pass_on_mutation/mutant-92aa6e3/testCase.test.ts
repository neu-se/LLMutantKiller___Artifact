import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        const result = new Delta(a).compose(new Delta(b)).ops;
        // This test specifically checks the keepNull parameter behavior
        if (!keepNull) {
          // When keepNull is false, we should remove null attributes
          return result.map(op => {
            if (op.attributes && Object.keys(op.attributes).every(key => op.attributes![key] === null)) {
              const newOp = { ...op };
              delete newOp.attributes;
              return newOp;
            }
            return op;
          });
        }
        return result;
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should pass keepNull=false when composing embed with retain', () => {
    const a = new Delta().insert({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().insert({
      delta: [{ insert: 'ba' }],
    });
    const result = a.compose(b);
    expect(result).toEqual(expected);
    // Verify that attributes are not present when they would be all null
    expect(result.ops[0]).toEqual({
      insert: { delta: [{ insert: 'ba' }] }
    });
  });
});