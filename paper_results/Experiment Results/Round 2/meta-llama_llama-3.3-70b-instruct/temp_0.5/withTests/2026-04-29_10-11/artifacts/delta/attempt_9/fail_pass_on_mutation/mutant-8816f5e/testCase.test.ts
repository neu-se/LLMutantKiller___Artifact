import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler and thisData is object, otherData is object', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => {
        if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
          throw new Error('both thisData and otherData are objects');
        }
        return b;
      },
      invert: (a, b) => a,
    });

    const delta1 = new Delta().retain({ test: { a: 1 } });
    const delta2 = new Delta().retain({ test: { b: 2 } });

    expect(() => delta1.transform(delta2)).toThrowError('both thisData and otherData are objects');

    Delta.unregisterEmbed('test');
  });
});