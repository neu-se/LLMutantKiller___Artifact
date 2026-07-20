import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a retain operation on an object', () => {
    Delta.registerEmbed('embed', {
      compose: (a: any, b: any) => ({ embed: a }),
      transform: (a: any, b: any, priority: boolean) => ({ embed: priority ? a : b }),
      invert: (a: any, b: any) => ({ embed: a }),
    });
    const delta = new Delta().retain({ embed: 1 });
    const base = new Delta().insert({ embed: 1 });
    const expected = new Delta().retain({ embed: 1 }, { bold: null });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});