import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should trigger retain optimization when firstOther has numeric retain without attributes', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B').insert('C', { bold: true }).retain(5).delete(1);
    const b = new Delta().retain(4);
    const result = a.compose(b);
    // This test specifically checks the optimization path where firstOther.retain is a number
    // The mutation changes the condition from checking typeof firstOther.retain === 'number'
    // to typeof firstOther.retain === "" which should fail
    expect(result.ops[3]).toEqual({ retain: 1 });
    expect(result.ops[4]).toEqual({ delete: 1 });
  });
});