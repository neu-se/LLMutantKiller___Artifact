import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff', () => {
  it('should correctly diff two deltas', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().insert('Hello World');
    const result = a.diff(b);
    expect(result.ops).toEqual([
      { retain: 5 },
      { insert: ' World' }
    ]);
  });
});