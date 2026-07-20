import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose function', () => {
  it('should correctly handle composing a Delta with an embed and a Delta with an object', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b) => a,
      invert: (a, b) => a,
    });
    const delta1 = new Delta().retain({ embed: 'test' });
    const delta2 = new Delta().retain({ embed: 'test' });
    const result = delta1.compose(delta2);
    const expected = new Delta().retain({ embed: 'test' });
    expect(result).toEqual(expected);
  });
});