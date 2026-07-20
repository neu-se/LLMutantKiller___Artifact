import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should correctly transform a delta with a retain and an embed', () => {
    Delta.registerEmbed('embed', {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      transform: (a: any, b: any, priority: boolean) => {
        if (a !== null && typeof b === 'object' && b !== null && Object.keys(a)[0] === Object.keys(b)[0]) {
          return { ...a, ...b };
        } else {
          return b;
        }
      },
      invert: (a: any, b: any) => ({ ...a, ...b }),
    });
    const a = new Delta().retain({ embed: { test: 'value1' } });
    const b = new Delta().retain({ embed: { test: 'value2' } });
    const expected = new Delta().retain({ embed: { test: 'value1', test: 'value2' } });
    expect(a.transform(b)).toEqual(expected);
  });
});