import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embed handler', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        // This should only be called when handler exists
        return new Delta(a).transform(new Delta(b), priority).ops;
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should not transform when handler check fails', () => {
    // Unregister the handler to simulate missing handler
    Delta.unregisterEmbed('delta');

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });

    // Original code should throw error when handler doesn't exist
    // Mutated code (if (true)) will try to call transform anyway
    expect(() => {
      a.transform(b, true);
    }).toThrowError('no handlers for embed type "delta"');
  });
});