import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when trying to get a handler for an embed type after unregistering it', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    Delta.unregisterEmbed('test');
    expect(() => Delta.getHandler('test')).toThrowError('no handlers for embed type "test"');
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    Delta.unregisterEmbed('test');
    expect(() => Delta.getHandler('test')).toThrowError('no handlers for embed type "test"');
  });
});