import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('delete after object retain with preceding insert', () => {
    Delta.registerEmbed('block', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    try {
      const a = new Delta().insert('A').retain({ block: 1 });
      const b = new Delta().retain(1).delete(1);
      const expected = new Delta().insert('A').delete(1);
      expect(a.compose(b)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('block');
    }
  });
});