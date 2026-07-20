import Delta from "../src/Delta";
import Op from "../src/Op";

describe('Delta.unregisterEmbed()', () => {
  it('should remove a registered embed handler so that using it afterwards throws an error', () => {
    // Register a handler for a custom embed type
    Delta.registerEmbed<Op[]>('testEmbed', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    // Verify the handler works before unregistering
    const a = new Delta().insert({ testEmbed: [{ insert: 'a' }] });
    const b = new Delta().retain({ testEmbed: [{ insert: 'b' }] });
    expect(() => a.compose(b)).not.toThrow();

    // Unregister the handler
    Delta.unregisterEmbed('testEmbed');

    // After unregistering, using the embed type should throw because the handler is gone
    const c = new Delta().insert({ testEmbed: [{ insert: 'a' }] });
    const d = new Delta().retain({ testEmbed: [{ insert: 'b' }] });
    expect(() => c.compose(d)).toThrow('no handlers for embed type "testEmbed"');
  });
});