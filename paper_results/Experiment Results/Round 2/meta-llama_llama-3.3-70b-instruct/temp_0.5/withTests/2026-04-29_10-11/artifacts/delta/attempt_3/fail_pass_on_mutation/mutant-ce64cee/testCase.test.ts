import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should successfully unregister an embed type after registering it', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    expect(() => Delta.unregisterEmbed('test')).not.toThrowError();
  });
});