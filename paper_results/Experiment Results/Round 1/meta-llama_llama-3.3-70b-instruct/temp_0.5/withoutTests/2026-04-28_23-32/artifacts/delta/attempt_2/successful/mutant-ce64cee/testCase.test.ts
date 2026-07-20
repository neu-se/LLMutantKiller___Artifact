import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly unregister an embed handler', () => {
    const embedType = 'testEmbed';
    const handler = {
      compose: () => {},
      invert: () => {},
      transform: () => {},
    };

    Delta.registerEmbed(embedType, handler);
    Delta.unregisterEmbed(embedType);

    expect(() => Delta.getHandler(embedType)).toThrowError(`no handlers for embed type "${embedType}"`);
  });
});