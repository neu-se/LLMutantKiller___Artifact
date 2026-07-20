import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        // This handler will behave differently based on keepNull
        if (keepNull) {
          // When keepNull is true, preserve all attributes including nulls
          return new Delta(a).compose(new Delta(b)).ops;
        } else {
          // When keepNull is false, filter out null attributes
          const result = new Delta(a).compose(new Delta(b)).ops;
          return result.map(op => {
            if (op.attributes) {
              const filteredAttrs = Object.fromEntries(
                Object.entries(op.attributes).filter(([_, value]) => value !== null)
              );
              if (Object.keys(filteredAttrs).length > 0) {
                return { ...op, attributes: filteredAttrs };
              } else {
                const { attributes, ...rest } = op;
                return rest;
              }
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

  it('should pass keepNull=false when composing insert with retain embed', () => {
    const a = new Delta().insert({ delta: [{ insert: 'a' }] }, { bold: true, color: null });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.compose(b);
    // When action is 'insert', keepNull should be false
    // This means null attributes should be removed
    expect(result.ops[0]).toEqual({
      insert: { delta: [{ insert: 'ba' }] },
      attributes: { bold: true } // color: null should be removed
    });
  });
});