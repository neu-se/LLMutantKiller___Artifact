import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should transform correctly', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => a,
      invert: (a, b) => a,
    });
    const a = new Delta().retain({ test: null });
    const b = new Delta().retain({ test: {} });
    const expected = new Delta().retain({ test: {} });
    expect(a.transform(b, true)).toEqual(expected);
  });
});