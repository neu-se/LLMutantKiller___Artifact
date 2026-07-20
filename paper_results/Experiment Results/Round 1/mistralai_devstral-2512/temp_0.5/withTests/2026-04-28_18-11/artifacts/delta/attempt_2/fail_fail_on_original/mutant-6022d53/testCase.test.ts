import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transformPosition()', () => {
  it('insert at position with priority false and offset less than index', () => {
    const delta = new Delta().retain(3).insert('A');
    expect(delta.transform(2, false)).toEqual(3);
  });
});