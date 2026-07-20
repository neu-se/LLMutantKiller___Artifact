import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('correctly transforms two deltas with only retain operations', () => {
    const a = new Delta().retain(5);
    const b = new Delta().retain(5);
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 5 }]);
  });
});