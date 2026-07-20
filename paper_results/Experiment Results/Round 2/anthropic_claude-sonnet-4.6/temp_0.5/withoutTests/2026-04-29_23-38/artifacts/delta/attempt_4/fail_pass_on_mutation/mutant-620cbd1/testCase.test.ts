import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('correctly handles compose optimization with inserts followed by attributed retain', () => {
    const a = new Delta().insert('hello').retain(5, { bold: true });
    const b = new Delta().retain(5);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: 'hello' },
      { retain: 5, attributes: { bold: true } }
    ]);
  });
});