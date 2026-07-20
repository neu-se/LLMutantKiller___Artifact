import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed retain', () => {
  it('should handle retain with null object correctly', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      transform: (a, b) => b,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ test: null });
    const b = new Delta().insert('X').delete(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'X' }, { delete: 1 }]);

    Delta.unregisterEmbed('test');
  });
});