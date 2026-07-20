import Delta from '../Delta';

describe('Delta', () => {
  it('should throw an error when trying to register an embed handler after unregistering it', () => {
    const embedType = 'testEmbed';
    const handler = {
      compose: () => {},
      invert: () => {},
      transform: () => {},
    };

    Delta.registerEmbed(embedType, handler);
    Delta.unregisterEmbed(embedType);

    expect(() => Delta.registerEmbed(embedType, handler)).not.toThrow();
  });
});