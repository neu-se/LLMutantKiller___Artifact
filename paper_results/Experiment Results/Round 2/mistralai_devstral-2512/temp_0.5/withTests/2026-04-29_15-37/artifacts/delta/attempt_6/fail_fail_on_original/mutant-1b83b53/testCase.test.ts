import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b, keepNull) => {
        const deltaA = new Delta(a);
        const deltaB = new Delta(b);
        const composed = deltaA.compose(deltaB);
        // Add a marker to track keepNull parameter
        if (keepNull === true) {
          composed.ops.push({ insert: 'KEEP_NULL_TRUE' });
        } else if (keepNull === false) {
          composed.ops.push({ insert: 'KEEP_NULL_FALSE' });
        }
        return composed.ops;
      },
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should pass keepNull=true when composing embed retains', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.compose(b);
    // Check if KEEP_NULL_TRUE marker is present
    const hasKeepNullTrue = result.ops.some(op => op.insert === 'KEEP_NULL_TRUE');
    expect(hasKeepNullTrue).toBe(true);
  });
});