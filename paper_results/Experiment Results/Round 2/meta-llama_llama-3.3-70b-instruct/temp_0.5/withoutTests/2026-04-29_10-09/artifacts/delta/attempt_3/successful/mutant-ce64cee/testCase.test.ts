import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should remove the handler when unregistering an embed', () => {
    const embedType = 'test';
    const handler = {
      compose: () => {},
      invert: () => {},
      transform: () => {},
    };

    Delta.registerEmbed(embedType, handler);
    expect(Delta.handlers[embedType]).not.toBeNull();

    Delta.unregisterEmbed(embedType);
    expect(Delta.handlers[embedType]).toBeUndefined();
  });
});