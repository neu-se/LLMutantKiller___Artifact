import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should not transform embed when thisData is null', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        // This should never be called when thisData is null in original code
        throw new Error('Transform handler should not be called when thisData is null');
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });

    // Original code: should not throw (handler not called)
    // Mutated code: will throw (handler called incorrectly)
    expect(() => a.transform(b, true)).not.toThrow();

    Delta.unregisterEmbed('delta');
  });
});