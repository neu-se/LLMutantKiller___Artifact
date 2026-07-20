import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert with delete operation', () => {
  it('should correctly invert a delta with delete operation', () => {
    const base = new Delta().insert('Hello World');
    const delta = new Delta().delete(5);
    const inverted = delta.invert(base);

    const expected = new Delta().insert('Hello');
    expect(inverted.ops).toEqual(expected.ops);
  });
});