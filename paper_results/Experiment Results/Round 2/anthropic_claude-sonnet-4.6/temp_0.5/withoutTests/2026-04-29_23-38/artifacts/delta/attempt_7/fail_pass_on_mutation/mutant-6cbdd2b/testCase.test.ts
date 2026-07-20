import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly compose when other starts with an insert followed by a retain', () => {
    const a = new Delta().insert('hello');
    const b = new Delta().insert('X').retain(5);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'Xhello' }]);
  });
});