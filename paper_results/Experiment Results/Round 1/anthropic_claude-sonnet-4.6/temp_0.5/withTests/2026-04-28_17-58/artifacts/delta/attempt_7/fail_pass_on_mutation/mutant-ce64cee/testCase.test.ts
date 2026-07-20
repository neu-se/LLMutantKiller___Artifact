import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Delta.unregisterEmbed()', () => {
  it('after unregistering an embed handler, composing two deltas with that embed type should throw a no handler error', () => {
    const embedType = 'testEmbedForUnregister';

    Delta.registerEmbed<Op[]>(embedType, {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    Delta.unregisterEmbed(embedType);

    // Re-register with a different handler to confirm the original was removed
    // and this new one takes effect
    let handlerCalled = false;
    Delta.registerEmbed<Op[]>(embedType, {
      compose: (a: Op[], b: Op[]) => {
        handlerCalled = true;
        return new Delta(a).compose(new Delta(b)).ops;
      },
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().insert({ [embedType]: [{ insert: 'a' }] });
    const b = new Delta().retain({ [embedType]: [{ insert: 'b' }] });
    a.compose(b);

    // Clean up
    Delta.unregisterEmbed(embedType);

    expect(handlerCalled).toBe(true);
  });
});