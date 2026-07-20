import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('compose optimization preserves empty attributes object in rest ops', () => {
    const a = new Delta([
      { retain: 5 },
      { insert: 'x', attributes: {} },
      { insert: 'y' },
    ]);
    const b = new Delta().retain(5);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { retain: 5 },
      { insert: 'x', attributes: {} },
      { insert: 'y' },
    ]);
  });
});