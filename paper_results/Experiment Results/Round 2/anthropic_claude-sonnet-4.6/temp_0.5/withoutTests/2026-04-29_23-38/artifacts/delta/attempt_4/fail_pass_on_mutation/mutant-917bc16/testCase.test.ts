import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('preserves attributes on insert ops when other delta is exhausted', () => {
    const a = new Delta().retain(3).insert('hello', { bold: true });
    const b = new Delta().retain(3);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { retain: 3 },
      { insert: 'hello', attributes: { bold: true } },
    ]);
  });
});