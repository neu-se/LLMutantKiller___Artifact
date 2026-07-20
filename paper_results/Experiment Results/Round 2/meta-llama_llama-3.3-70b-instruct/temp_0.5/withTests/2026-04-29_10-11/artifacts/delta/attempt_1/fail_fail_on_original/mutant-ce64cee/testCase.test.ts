import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when trying to unregister an embed type without a handler', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    Delta.unregisterEmbed('test');
    expect(() => Delta.unregisterEmbed('test')).toThrowError(
      'no handlers for embed type "test"',
    );
  });
});