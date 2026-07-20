import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should transform correctly', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      transform: (a, b, priority) => b,
      invert: (a, b) => b,
    });
    const a = new Delta().retain({ test: null });
    const b = new Delta().retain({ test: null });
    const expected = new Delta().retain({ test: null });
    expect(a.transform(b, true)).toEqual(expected);
  });
});