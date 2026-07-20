import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain({ embed: 1 });
    const expected = new Delta().insert({ embed: 1 }, { bold: true });
    expect(a.compose(b.retain(1, { bold: true }))).toEqual(expected);
  });
});