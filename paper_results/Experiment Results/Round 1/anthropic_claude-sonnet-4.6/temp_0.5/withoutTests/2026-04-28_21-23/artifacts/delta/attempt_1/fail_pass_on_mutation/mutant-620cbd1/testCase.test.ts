import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization', () => {
  it('should correctly compose when other starts with a retain covering inserts', () => {
    const a = new Delta().insert('hello').insert(' world');
    const b = new Delta().retain(11).insert('!');
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('hello world!'));
  });
});