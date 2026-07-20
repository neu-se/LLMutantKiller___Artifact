import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should delete the embed handler when unregistering an embed type', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    Delta.unregisterEmbed('test');
    expect(Delta.getHandler('test')).toThrowError('no handlers for embed type "test"');
  });
});