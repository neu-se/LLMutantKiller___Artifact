import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transformPosition()', () => {
  it('should correctly handle insert at position with priority', () => {
    const delta = new Delta().retain(2).insert('A');
    expect(delta.transform(2, true)).toEqual(2);
    expect(delta.transform(2, false)).toEqual(3);
  });
});