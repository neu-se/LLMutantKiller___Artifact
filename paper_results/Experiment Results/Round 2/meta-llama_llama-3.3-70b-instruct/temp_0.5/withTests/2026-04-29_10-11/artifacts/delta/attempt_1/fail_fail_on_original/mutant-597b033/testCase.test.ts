import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when trying to register an embed handler with an invalid embed type', () => {
    expect(() => {
      Delta.registerEmbed('invalid', {
        compose: (a, b, keepNull) => a,
        invert: (a, b) => a,
        transform: (a, b, priority) => a,
      });
    }).toThrowError('no handlers for embed type "invalid"');
  });
});