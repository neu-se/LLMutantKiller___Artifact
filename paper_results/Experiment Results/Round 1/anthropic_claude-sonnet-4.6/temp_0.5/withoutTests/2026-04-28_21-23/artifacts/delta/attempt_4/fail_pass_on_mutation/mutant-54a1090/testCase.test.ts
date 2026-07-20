import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('composes two deltas where both have inserts at the same position', () => {
    // When both this and other have inserts, other's insert should come after this's insert
    const a = new Delta().insert('A');
    const b = new Delta().insert('B').retain(1);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('BA'));
  });
});