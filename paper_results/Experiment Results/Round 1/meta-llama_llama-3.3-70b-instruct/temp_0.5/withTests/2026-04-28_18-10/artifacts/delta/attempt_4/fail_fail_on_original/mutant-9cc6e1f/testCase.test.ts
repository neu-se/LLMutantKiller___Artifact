import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler', () => {
    Delta.registerEmbed('delta', {
      compose: (a, b) => {
        if (a.delta && b.delta) {
          return { delta: [...a.delta, ...b.delta] };
        }
        return a;
      },
      transform: (a, b, priority) => {
        if (a.delta && b.delta) {
          return { delta: [...a.delta, ...b.delta] };
        }
        return a;
      },
      invert: (a, b) => {
        if (a.delta && b.delta) {
          return { delta: a.delta.filter((item) => !b.delta.includes(item)) };
        }
        return a;
      },
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});