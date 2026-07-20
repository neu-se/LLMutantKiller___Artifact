import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should detect mutation in transform function', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => ({ embed: a }),
      invert: (a, b) => ({ embed: a }),
      transform: (a, b, priority) => ({ embed: a }),
    });
    const a = new Delta().retain(1, { embed: 1 });
    const b = new Delta().retain(1, { embed: 2 });
    const expected = new Delta().retain(1, { embed: 1 });
    expect(a.transform(b)).toEqual(expected);
  });
});