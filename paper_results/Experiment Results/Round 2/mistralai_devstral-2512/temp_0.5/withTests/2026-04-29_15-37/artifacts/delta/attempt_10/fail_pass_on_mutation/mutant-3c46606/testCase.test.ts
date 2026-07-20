import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embed handler', () => {
  beforeEach(() => {
    // Register a handler that will throw if called
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        throw new Error("Handler should not be called when types don't match");
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('should not call handler when embed types differ', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ other: [{ insert: 'b' }] });

    // Original code: handler check fails, so transform isn't called
    // Mutated code: if(true) always passes, so transform is called and throws
    expect(() => {
      a.transform(b, true);
    }).not.toThrow();
  });
});