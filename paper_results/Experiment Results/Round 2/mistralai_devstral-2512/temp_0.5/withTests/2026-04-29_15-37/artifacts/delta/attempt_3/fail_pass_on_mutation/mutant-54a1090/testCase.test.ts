import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize retain when composing with insert after retain', () => {
    const a = new Delta().insert('A').insert('B').insert('C').retain(5).delete(1);
    const b = new Delta().retain(4).insert('D');
    const expected = new Delta().insert('A').insert('B').insert('C').retain(1).insert('D').retain(4).delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});