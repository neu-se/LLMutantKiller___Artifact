import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler', () => {
    Delta.registerEmbed<{ insert: string }>('delta', {
      compose: (a, b) => ({ insert: a.insert + b.insert }),
      transform: (a, b, priority) => {
        const embedTypeA = Object.keys(a)[0];
        const embedTypeB = Object.keys(b)[0];
        if (embedTypeA === embedTypeB) {
          return { insert: a.insert + b.insert };
        } else {
          throw new Error(`embed types not matched: ${embedTypeA} != ${embedTypeB}`);
        }
      },
      invert: (a, b) => ({ insert: a.insert.replace(b.insert, '') }),
    });

    const a = new Delta().retain({ delta: { insert: 'a' } });
    const b = new Delta().retain({ delta: { insert: 'b' } });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ delta: { insert: 'ab' } });
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});