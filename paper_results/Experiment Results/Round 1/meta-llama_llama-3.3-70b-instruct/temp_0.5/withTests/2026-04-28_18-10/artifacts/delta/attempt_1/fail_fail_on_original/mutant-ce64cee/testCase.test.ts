import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('unregisterEmbed', () => {
  it('should throw an error when unregisterEmbed is called without deleting the handler', () => {
    Delta.registerEmbed('test', {
      compose: () => {},
      transform: () => {},
      invert: () => {},
    });
    Delta.unregisterEmbed = () => {};
    expect(() => Delta.getHandler('test')).toThrowError(
      'no handlers for embed type "test"',
    );
  });

  it('should not throw an error when unregisterEmbed is called with the original implementation', () => {
    Delta.registerEmbed('test', {
      compose: () => {},
      transform: () => {},
      invert: () => {},
    });
    Delta.unregisterEmbed('test');
    expect(() => Delta.getHandler('test')).toThrowError(
      'no handlers for embed type "test"',
    );
  });
});