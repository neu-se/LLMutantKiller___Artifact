import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler and null check for otherData', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });

    const delta1 = new Delta().retain({ test: 'a' });
    const delta2 = new Delta().retain(null);

    expect(() => delta1.transform(delta2)).toThrowError('no handlers for embed type "null"');

    Delta.unregisterEmbed('test');
  });
});