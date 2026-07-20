import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        // Track whether keepNull was true or false
        const lastKeepNull = keepNull;
        const result = new Delta(a).compose(new Delta(b)).ops;
        // Modify the result to include information about keepNull
        if (result.length > 0 && result[0].retain) {
          (result[0].retain as any).keepNull = lastKeepNull;
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
    // The test verifies the keepNull value is correctly set
    expect(result.ops[0].retain).toHaveProperty('keepNull', true);
  });
});