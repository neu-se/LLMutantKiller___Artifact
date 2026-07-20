import Delta from "../../src/Delta";

describe('Delta', () => {
  it('transformPosition insert before position with priority false', () => {
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(2, false)).toEqual(3);
  });
});