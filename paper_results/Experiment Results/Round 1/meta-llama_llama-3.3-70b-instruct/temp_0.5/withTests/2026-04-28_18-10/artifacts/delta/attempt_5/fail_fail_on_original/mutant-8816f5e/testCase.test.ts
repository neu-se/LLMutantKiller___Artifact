import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => ({ embed: a }),
      transform: (a, b, priority) => ({ embed: b }),
      invert: (a, b) => ({ embed: b }),
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().retain({ embed: 2 });
    const result = a.transform(b);
    expect(result.ops[0].retain).toEqual(expected.ops[0].retain);
    Delta.unregisterEmbed('embed');
  });
});