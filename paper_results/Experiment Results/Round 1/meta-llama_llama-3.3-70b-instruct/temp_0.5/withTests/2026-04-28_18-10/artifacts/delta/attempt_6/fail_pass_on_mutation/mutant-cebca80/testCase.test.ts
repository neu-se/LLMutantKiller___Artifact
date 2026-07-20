import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a retain operation on an object', () => {
    Delta.registerEmbed('embed', {
      compose: (a: any, b: any) => ({ embed: a.embed + b.embed }),
      transform: (a: any, b: any, priority: boolean) => ({ embed: priority ? a.embed : b.embed }),
      invert: (a: any, b: any) => ({ embed: a.embed - b.embed }),
    });
    const delta = new Delta().retain(1, { bold: true });
    const base = new Delta().insert('a');
    const expected = new Delta().retain(1, { bold: null });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});