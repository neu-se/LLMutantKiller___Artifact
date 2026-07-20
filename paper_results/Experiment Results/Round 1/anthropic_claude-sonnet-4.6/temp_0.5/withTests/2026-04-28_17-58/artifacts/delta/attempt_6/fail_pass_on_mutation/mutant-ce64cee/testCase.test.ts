import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Delta.unregisterEmbed()', () => {
  it('should remove a registered embed handler such that subsequent operations throw an error about missing handler', () => {
    const embedType = 'myUniqueTestEmbed_' + Math.floor(Date.now() / 1000);

    Delta.registerEmbed<Op[]>(embedType, {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    // Confirm it works before unregistering
    const a = new Delta().insert({ [embedType]: [{ insert: 'a' }] });
    const b = new Delta().retain({ [embedType]: [{ insert: 'b' }] });
    expect(() => a.compose(b)).not.toThrow();

    // Unregister
    Delta.unregisterEmbed(embedType);

    // Now it should throw because the handler was removed
    const c = new Delta().insert({ [embedType]: [{ insert: 'a' }] });
    const d = new Delta().retain({ [embedType]: [{ insert: 'b' }] });
    expect(() => c.compose(d)).toThrowError(
      `no handlers for embed type "${embedType}"`,
    );
  });
});