import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose optimization with leading retain', () => {
  it('should correctly compose when other starts with a plain number retain covering leading inserts', () => {
    const a = new Delta().insert('hello');
    const b = new Delta().retain(5).insert(' world');
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'hello world' }]);
  });
});