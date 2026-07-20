import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain with embed correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => ({ embed: a }),
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    const delta1 = new Delta().insert({ embed: 1 });
    const delta2 = new Delta().retain({ embed: 2 });
    const result = delta1.compose(delta2);
    expect(result.ops[0].insert).toEqual({ embed: 1 });
  });
});