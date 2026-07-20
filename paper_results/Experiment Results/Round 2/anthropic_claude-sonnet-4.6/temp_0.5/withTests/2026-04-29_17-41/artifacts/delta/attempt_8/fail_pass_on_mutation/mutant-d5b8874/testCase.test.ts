import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('plain retain followed by delete produces delete in original', () => {
    // a retains 1, b deletes 1 - the delete should survive composition
    const a = new Delta().retain(1);
    const b = new Delta().delete(1);
    expect(a.compose(b)).toEqual(new Delta().delete(1));
  });
});