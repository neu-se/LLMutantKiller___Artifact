import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should return the correct delta when transforming a retain operation with an embed', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => {
        if (typeof otherData === 'object' && otherData!== null) {
          return otherData;
        } else {
          return length;
        }
      },
      invert: (a, b) => a,
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 2 });
    expect(a.transform(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});