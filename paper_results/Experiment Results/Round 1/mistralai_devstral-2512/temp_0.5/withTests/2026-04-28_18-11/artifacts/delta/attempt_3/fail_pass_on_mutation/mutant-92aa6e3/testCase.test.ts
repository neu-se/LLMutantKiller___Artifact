import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        // This handler will behave differently based on keepNull
        if (keepNull) {
          return new Delta(a).compose(new Delta(b)).ops;
        } else {
          // When keepNull is false, return empty ops to make the difference visible
          return [];
        }
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should correctly pass keepNull=true when composing retain operations', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.compose(b);
    // Original code passes keepNull=true (action === 'retain')
    // Mutated code passes keepNull=true (always true)
    // But our handler returns [] when keepNull is false, which would happen
    // if the mutation changed the condition
    expect(result.ops.length).toBeGreaterThan(0);
    expect(result.ops).toEqual([{ retain: { delta: [{ insert: 'ba' }] } }]);
  });
});