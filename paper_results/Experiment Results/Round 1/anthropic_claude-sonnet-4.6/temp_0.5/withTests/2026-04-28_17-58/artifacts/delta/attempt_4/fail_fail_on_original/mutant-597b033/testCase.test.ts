import Delta from "../../../../../../../../../../../../../src/Delta.ts";

describe('Delta', () => {
  it('insert before position', () => {
    const delta = new Delta().insert('A');
    expect(delta.transformPosition(2, false)).toEqual(3);
  });
});