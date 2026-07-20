import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should compose correctly with multiple small inserts fitting within a retain', () => {
    const a = new Delta([
      { insert: 'A' },
      { insert: 'B' },
      { insert: 'C' },
    ]);
    const b = new Delta([
      { retain: 3 },
      { insert: 'D' },
    ]);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'ABCD' }]);
  });
});