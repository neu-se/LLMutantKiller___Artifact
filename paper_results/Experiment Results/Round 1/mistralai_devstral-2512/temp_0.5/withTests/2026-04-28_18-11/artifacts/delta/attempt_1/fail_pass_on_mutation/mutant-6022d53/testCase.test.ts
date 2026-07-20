import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transformPosition()', () => {
  it('insert at position with priority false', () => {
    const delta = new Delta().retain(2).insert('A');
    expect(delta.transform(2, false)).toEqual(3);
  });
});