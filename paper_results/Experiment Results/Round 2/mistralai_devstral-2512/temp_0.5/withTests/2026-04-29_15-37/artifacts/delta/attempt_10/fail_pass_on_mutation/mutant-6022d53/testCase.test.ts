import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transformPosition()', () => {
  it('should correctly transform position when insert occurs at offset less than index', () => {
    const delta = new Delta().retain(1).insert('A');
    expect(delta.transform(2)).toEqual(3);
  });
});