import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a: any, b: any) => ({ embed: a.embed + b.embed }),
      invert: (a: any, b: any) => ({ embed: a.embed - b.embed }),
      transform: (a: any, b: any, priority: boolean) => priority ? a : b,
    });
    const a = new Delta().insert({ embed: { embed: 1 } });
    const b = new Delta().retain({ embed: { embed: 2 } });
    const expected = new Delta().insert({ embed: { embed: 3 } });
    expect(a.compose(b)).toEqual(expected);
  });
});