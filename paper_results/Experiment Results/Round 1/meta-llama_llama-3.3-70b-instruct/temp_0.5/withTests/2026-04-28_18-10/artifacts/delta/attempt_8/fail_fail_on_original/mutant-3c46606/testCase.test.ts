import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler and different embed types, checking for error', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });
    const deltaA = new Delta().retain({ test: 'a' });
    const deltaB = new Delta().retain({ other: 'b' });
    expect(() => deltaA.transform(deltaB)).toThrowError('no handlers for embed type "other"');
    Delta.unregisterEmbed('test');
  });
});