import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta.unregisterEmbed', () => {
  it('should remove a registered embed handler so that getHandler throws after unregistering', () => {
    const handler = {
      compose: (a: unknown, b: unknown, keepNull: boolean) => ({}),
      invert: (a: unknown, b: unknown) => ({}),
      transform: (a: unknown, b: unknown, priority: boolean) => ({}),
    };

    Delta.registerEmbed('testEmbed', handler);
    Delta.unregisterEmbed('testEmbed');

    // After unregistering, attempting to use the embed type should throw
    const delta1 = new Delta([{ retain: { testEmbed: { val: 1 } } }]);
    const delta2 = new Delta([{ retain: { testEmbed: { val: 2 } } }]);

    expect(() => {
      delta1.compose(delta2);
    }).toThrow('no handlers for embed type "testEmbed"');
  });
});