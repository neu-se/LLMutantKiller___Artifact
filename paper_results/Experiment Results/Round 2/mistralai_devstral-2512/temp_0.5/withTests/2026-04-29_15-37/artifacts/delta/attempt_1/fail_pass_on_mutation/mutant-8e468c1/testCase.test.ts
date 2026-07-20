import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle insert operations correctly when first other op is retain', () => {
    // This test case is designed to expose the mutation where
    // the condition was changed from === 'insert' to !== 'insert'
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta().retain(1).insert('C');
    const expected = new Delta().insert('AC').insert('B', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});