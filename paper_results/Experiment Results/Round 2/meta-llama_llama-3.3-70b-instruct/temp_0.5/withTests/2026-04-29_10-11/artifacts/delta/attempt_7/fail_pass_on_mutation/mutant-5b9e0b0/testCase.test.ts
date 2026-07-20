import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain with embed correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    const delta1 = new Delta().insert({ embed: 1 });
    const delta2 = new Delta().retain(1);
    const expected = new Delta().insert({ embed: 1 });
    expect(delta1.compose(delta2)).toEqual(expected);
  });
});