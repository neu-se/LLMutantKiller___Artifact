import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly compose when other starts with an attributed retain', () => {
    const a = new Delta().insert('hello');
    const b = new Delta().retain(5, { bold: true });
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'hello', attributes: { bold: true } }]);
  });
});