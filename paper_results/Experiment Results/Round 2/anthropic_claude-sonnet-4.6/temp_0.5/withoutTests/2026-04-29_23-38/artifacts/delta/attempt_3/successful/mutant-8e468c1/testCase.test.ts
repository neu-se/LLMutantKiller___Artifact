import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('correctly composes delete with retain+insert', () => {
    const a = new Delta().delete(2);
    const b = new Delta().retain(3).insert('Z');
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { delete: 2 },
      { retain: 3 },
      { insert: 'Z' },
    ]);
  });
});