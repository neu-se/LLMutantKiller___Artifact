import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when trying to register an embed handler with the same type after unregistering it', () => {
    const embedType = 'test';
    const handler = {
      compose: () => {},
      invert: () => {},
      transform: () => {},
    };

    Delta.registerEmbed(embedType, handler);
    Delta.unregisterEmbed(embedType);

    expect(() => Delta.registerEmbed(embedType, handler)).toThrowError(`no handlers for embed type "${embedType}"`);
  });
});