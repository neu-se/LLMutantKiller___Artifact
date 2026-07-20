import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when trying to register an embed handler with an empty string type', () => {
    expect(() => Delta.registerEmbed("", {} as any)).toThrowError(
      'no handlers for embed type ""'
    );
  });
});