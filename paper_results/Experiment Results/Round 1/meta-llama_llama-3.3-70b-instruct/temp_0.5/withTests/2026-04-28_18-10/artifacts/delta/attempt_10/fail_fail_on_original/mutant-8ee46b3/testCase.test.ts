import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should handle transform with embed and number correctly when embed handler is registered', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain(1);
    const expected = new Delta().retain(1);
    expect(a.transform(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});