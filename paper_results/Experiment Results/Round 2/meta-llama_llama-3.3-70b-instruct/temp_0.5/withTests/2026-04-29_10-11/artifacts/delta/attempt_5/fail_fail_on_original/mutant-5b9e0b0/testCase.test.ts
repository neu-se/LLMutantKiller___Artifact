import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain with embed correctly when thisOp.retain is not null', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => ({ ...a, ...b }),
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    const delta1 = new Delta().insert({ embed: 1 });
    const delta2 = new Delta().retain({ embed: 2 });
    const expected = new Delta().insert({ embed: { 1: 1, 2: 2 } });
    expect(delta1.compose(delta2)).toEqual(expected);
  });
});