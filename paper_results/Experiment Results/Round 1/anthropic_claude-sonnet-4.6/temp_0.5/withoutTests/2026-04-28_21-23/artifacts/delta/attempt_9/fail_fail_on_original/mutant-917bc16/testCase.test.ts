import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('compose optimization concat vs loop difference with non-normalized ops', () => {
    // Construct a non-normalized delta directly to expose concat vs loop difference
    const a = new Delta([{ retain: 1, attributes: { bold: true } }, { retain: 3 }, { retain: 4 }]);
    const b = new Delta().retain(1);
    const result = a.compose(b);
    // With optimization: concat appends {retain:3} and {retain:4} separately after merging first
    // Without optimization: loop merges {retain:3} and {retain:4} into {retain:7}
    expect(result.ops).toEqual([{ retain: 7 }]);
  });
});