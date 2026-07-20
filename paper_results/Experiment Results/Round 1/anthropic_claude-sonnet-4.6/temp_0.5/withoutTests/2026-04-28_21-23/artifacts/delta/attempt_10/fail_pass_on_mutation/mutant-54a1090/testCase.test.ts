import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly compose when this insert is longer than others initial retain', () => {
    const a = new Delta().insert('ABCDE');
    const b = new Delta().retain(3).insert('X').retain(2);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('ABCXDE'));
  });
});