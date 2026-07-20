import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose', () => {
  it('retain start optimization with retain having attributes in a', () => {
    const a = new Delta().retain(2, { bold: true }).insert('Hello');
    const b = new Delta().retain(3).insert('X');
    const result = a.compose(b);
    // With original: retain(2,{bold}) is not insert, loop doesn't run
    // retain(2,{bold}) + insert('HeXllo') after normal processing
    // With mutation: retain(2,{bold}) consumed in opt loop, changes processing
    const expected = new Delta().retain(2, { bold: true }).insert('HeXllo');
    expect(result).toEqual(expected);
  });
});