import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('retain null composed with delete should produce empty delta', () => {
    const a = new Delta();
    // Try using retain method directly - if original was typeof check, null would push { retain: null }
    (a as any).ops = [{ retain: null }];
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    expect(result.ops).toEqual([]);
  });
});