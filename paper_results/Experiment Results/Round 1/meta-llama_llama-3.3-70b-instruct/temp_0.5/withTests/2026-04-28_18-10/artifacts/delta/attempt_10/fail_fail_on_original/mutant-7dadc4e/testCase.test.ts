import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should return the correct delta when transforming a retain operation with an embed', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => {
        if (typeof b === 'object' && b !== null && Object.keys(b).length > 0) {
          throw new Error('otherData should not be an object');
        } else {
          return a;
        }
      },
      invert: (a, b) => a,
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain(null);
    expect(() => a.transform(b)).toThrowError('otherData should not be an object');
    Delta.unregisterEmbed('embed');
  });
});