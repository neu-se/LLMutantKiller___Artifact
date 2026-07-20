import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should include inserts from other delta when composing', () => {
    // other has an insert - this should always be included in compose result
    const a = new Delta().retain(3);
    const b = new Delta().insert('X').retain(3);
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('X').retain(3));
  });
});