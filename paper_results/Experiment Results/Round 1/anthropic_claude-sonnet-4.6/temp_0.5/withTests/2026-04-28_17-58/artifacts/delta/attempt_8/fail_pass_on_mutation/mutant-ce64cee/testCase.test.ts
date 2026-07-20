import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Delta.unregisterEmbed()', () => {
  it('unregisterEmbed removes the handler so that composing embed deltas throws missing handler error', () => {
    const embedType = 'embedForUnregisterTest';

    // Register a handler
    Delta.registerEmbed<Op[]>(embedType, {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    // Unregister it
    Delta.unregisterEmbed(embedType);

    // On original code: handler is deleted, so this throws
    // On mutated code: handler still exists, so this does NOT throw
    let threw = false;
    try {
      const a = new Delta().insert({ [embedType]: [{ insert: 'a' }] });
      const b = new Delta().retain({ [embedType]: [{ insert: 'b' }] });
      a.compose(b);
    } catch (e) {
      threw = true;
    }

    expect(threw).toBe(true);
  });
});