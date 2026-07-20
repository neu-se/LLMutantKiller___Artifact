import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain with delete should keep the delete operation', () => {
    const a = new Delta().retain(1, { color: 'blue' });
    const b = new Delta().delete(1);
    const expected = new Delta().delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});