import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        const result = new Delta(a).compose(new Delta(b)).ops;
        // Add a marker op that indicates whether keepNull was true
        if (keepNull) {
          result.push({ insert: 'KEEP_NULL_TRUE' });
        } else {
          result.push({ insert: 'KEEP_NULL_FALSE' });
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

  it('should pass keepNull=true when composing retain operations', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.compose(b);
    // Original code: keepNull should be true (action === 'retain')
    // Mutated code: keepNull is always true
    // The test verifies the marker op is present
    expect(result.ops.some(op => op.insert === 'KEEP_NULL_TRUE')).toBe(true);
  });
});