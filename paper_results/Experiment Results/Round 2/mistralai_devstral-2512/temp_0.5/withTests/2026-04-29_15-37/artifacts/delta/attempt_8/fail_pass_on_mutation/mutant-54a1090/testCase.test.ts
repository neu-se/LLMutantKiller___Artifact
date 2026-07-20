import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when first other op is a plain retain and this ends with insert', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).insert('D');
    const result = a.compose(b);
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toEqual({ insert: 'ABCD' });
  });
});