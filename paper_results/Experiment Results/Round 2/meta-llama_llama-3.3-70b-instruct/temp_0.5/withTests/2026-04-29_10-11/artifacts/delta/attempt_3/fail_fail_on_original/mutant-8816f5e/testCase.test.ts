import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler and null check for thisData', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });

    const delta1 = new Delta().retain(null);
    const delta2 = new Delta().retain({ test: 'b' });

    expect(() => delta1.transform(delta2)).toThrowError('cannot retain a null');

    Delta.unregisterEmbed('test');
  });
});