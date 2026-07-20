import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('compose with retain-only other preserves document structure', () => {
    const a = new Delta().insert('hello').delete(3).insert('world');
    const b = new Delta().retain(10);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: 'hello' },
      { delete: 3 },
      { insert: 'world' }
    ]);
  });
});