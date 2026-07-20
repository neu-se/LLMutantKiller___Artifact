import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => b,
    });
    const a = new Delta().retain(1);
    const b = new Delta().retain({ embed: 2 });
    expect(() => a.transform(b)).toThrowError('embed types not matched: undefined != embed');
    Delta.unregisterEmbed('embed');
  });
});