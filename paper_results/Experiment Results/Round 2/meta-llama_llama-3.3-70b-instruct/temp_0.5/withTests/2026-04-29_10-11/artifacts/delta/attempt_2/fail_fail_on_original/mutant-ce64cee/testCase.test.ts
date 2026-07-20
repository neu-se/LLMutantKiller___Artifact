import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when trying to unregister an embed type that has not been registered', () => {
    expect(() => Delta.unregisterEmbed('test')).toThrowError(
      'no handlers for embed type "test"',
    );
  });
});