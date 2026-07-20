import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when first other op is a plain retain and this has multiple inserts', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(2).insert('X');
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'ABXC' }]);
  });
});