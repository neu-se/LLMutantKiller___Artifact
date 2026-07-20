import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transformPosition insert at offset 0 with priority true shifts index', () => {
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(2, true)).toEqual(3);
  });
});