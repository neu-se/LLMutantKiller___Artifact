import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transformPosition()', () => {
  it('insert at position with priority true and offset less than index', () => {
    const delta = new Delta().retain(2).insert('A');
    expect(delta.transform(1, true)).toEqual(1);
  });
});