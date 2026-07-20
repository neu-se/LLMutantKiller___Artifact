import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly compose when other starts with a plain number retain and this has multiple inserts', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).delete(0);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'ABC' }]);
  });
});