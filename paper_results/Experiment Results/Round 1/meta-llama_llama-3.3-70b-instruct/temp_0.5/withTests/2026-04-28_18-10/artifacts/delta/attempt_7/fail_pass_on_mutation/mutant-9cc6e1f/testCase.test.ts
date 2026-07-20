import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler', () => {
    Delta.registerEmbed<{ insert: string }>('delta', {
      compose: (a, b) => ({ insert: a.insert + b.insert }),
      transform: (a, b, priority) => {
        if (priority) {
          return { insert: b.insert + a.insert };
        } else {
          return { insert: a.insert + b.insert };
        }
      },
      invert: (a, b) => ({ insert: a.insert.replace(b.insert, '') }),
    });

    const a = new Delta().retain({ delta: { insert: 'a' } });
    const b = new Delta().retain({ delta: { insert: 'b' } });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ delta: { insert: 'ba' } });
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});