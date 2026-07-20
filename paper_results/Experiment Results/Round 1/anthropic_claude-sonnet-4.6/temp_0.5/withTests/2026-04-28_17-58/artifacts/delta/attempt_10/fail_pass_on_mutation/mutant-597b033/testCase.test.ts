import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transformPosition insert at position with priority false increments index', () => {
    const delta = new Delta().retain(2).insert('A');
    expect(delta.transformPosition(2, false)).toEqual(3);
  });
});