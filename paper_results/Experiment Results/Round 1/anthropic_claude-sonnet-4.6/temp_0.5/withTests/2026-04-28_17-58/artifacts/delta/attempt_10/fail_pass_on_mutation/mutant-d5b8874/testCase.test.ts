import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('delete entire document with object retain', () => {
    Delta.registerEmbed('embed', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    try {
      const a = new Delta().retain({ embed: 1 });
      const b = new Delta().insert('x').delete(1);
      const expected = new Delta().insert('x').delete(1);
      expect(a.compose(b)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('embed');
    }
  });
});