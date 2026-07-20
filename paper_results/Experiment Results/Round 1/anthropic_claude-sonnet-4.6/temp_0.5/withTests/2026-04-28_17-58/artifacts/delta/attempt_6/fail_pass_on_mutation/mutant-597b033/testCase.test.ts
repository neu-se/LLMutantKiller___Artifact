import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('insert before position transforms correctly', () => {
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(2, false)).toEqual(3);
  });
});