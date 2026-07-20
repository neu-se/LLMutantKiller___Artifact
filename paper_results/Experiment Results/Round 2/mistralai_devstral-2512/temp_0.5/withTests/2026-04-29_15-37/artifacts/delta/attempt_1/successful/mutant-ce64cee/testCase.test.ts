import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('unregisterEmbed', () => {
  it('should remove a registered embed handler', () => {
    // Register a custom embed handler
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b) => a,
      invert: (a, b) => a,
    });

    // Verify the handler is registered
    expect(() => {
      Delta.getHandler('test');
    }).not.toThrow();

    // Unregister the handler
    Delta.unregisterEmbed('test');

    // Verify the handler is no longer registered
    expect(() => {
      Delta.getHandler('test');
    }).toThrow('no handlers for embed type "test"');
  });
});