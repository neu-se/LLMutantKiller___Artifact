import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler and both thisData and otherData are objects, but embed types do not match', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });

    const delta1 = new Delta().retain({ test: { a: 1 } });
    const delta2 = new Delta().retain({ other: { b: 2 } });

    expect(() => delta1.transform(delta2)).toThrowError('embed types not matched: test != other');

    Delta.unregisterEmbed('test');
  });
});