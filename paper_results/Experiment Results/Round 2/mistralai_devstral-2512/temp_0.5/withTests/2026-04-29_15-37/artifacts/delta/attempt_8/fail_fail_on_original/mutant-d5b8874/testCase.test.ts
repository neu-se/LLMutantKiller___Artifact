import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with embed retain', () => {
  it('should not push delete when thisOp.retain is null', () => {
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => b,
      transform: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
    });

    const a = new Delta().insert('A').retain({ test: null });
    const b = new Delta().delete(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }, { delete: 1 }]);

    Delta.unregisterEmbed('test');
  });
});