import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the null check in the invert method', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b, priority) => a,
      invert: (a, b) => a,
    });
    const delta = new Delta().retain({ embed: 1 });
    const base = new Delta().insert({ embed: 1 });
    const inverted = delta.invert(base);
    expect(inverted.ops[0].retain).toEqual({ embed: 1 });
  });
});