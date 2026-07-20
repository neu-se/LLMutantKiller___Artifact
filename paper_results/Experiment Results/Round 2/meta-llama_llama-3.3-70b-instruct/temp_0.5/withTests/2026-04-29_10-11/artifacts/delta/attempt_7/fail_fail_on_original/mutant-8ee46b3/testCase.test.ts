import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should detect mutation in transform function', () => {
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 1 });
    Delta.registerEmbed('embed', {
      compose: (a, b) => ({ embed: a }),
      invert: (a, b) => ({ embed: a }),
      transform: (a, b, priority) => ({ embed: a }),
    });
    expect(a.transform(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});