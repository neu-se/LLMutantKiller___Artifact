import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('invert produces correct result', () => {
    const base = new Delta().insert('hello world');
    const delta = new Delta().retain(6).delete(5).insert('there');
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([
      { retain: 6 },
      { delete: 5 },
      { insert: 'world' },
    ]);
  });
});