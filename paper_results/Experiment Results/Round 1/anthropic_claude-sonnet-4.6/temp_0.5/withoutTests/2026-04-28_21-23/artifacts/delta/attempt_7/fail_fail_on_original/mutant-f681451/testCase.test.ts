import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('when this deletes and other retains, the retain should be dropped in transform', () => {
    const a = new Delta().retain(2).delete(1);
    const b = new Delta().retain(3);
    const result = a.transform(b);
    // this retains 2, deletes 1
    // other retains 3 (positions 0,1,2)
    // After transform:
    // - pos 0-1: both retain -> retain(2)
    // - pos 2: this deletes, other retains -> dropped
    // Result should be retain(2), chopped to retain(2)
    expect(result.ops).toEqual([{ retain: 2 }]);
  });
});