import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should not call transform handler when thisData is null', () => {
    let handlerCalled = false;
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => {
        handlerCalled = true;
        return new Delta(a).transform(new Delta(b), priority).ops;
      },
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    a.transform(b, true);

    Delta.unregisterEmbed('delta');

    // Original code: handler should NOT be called (thisData is null)
    // Mutated code: handler WILL be called (condition changed to true)
    expect(handlerCalled).toBe(false);
  });
});