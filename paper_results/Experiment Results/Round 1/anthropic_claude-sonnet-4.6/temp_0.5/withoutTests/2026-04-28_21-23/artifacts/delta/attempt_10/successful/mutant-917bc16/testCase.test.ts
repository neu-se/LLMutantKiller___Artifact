import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('compose with non-normalized ops exposes optimization difference', () => {
    // Non-normalized delta with two consecutive plain retains after a bold retain
    const a = new Delta({ ops: [{ retain: 1, attributes: { bold: true } }, { retain: 3 }, { retain: 4 }] });
    const b = new Delta().retain(1);
    const result = a.compose(b);
    // Original: optimization fires, concat appends {retain:3} directly (not merged with {retain:4})
    // chop removes trailing {retain:4}, leaving [{retain:1,bold},{retain:3}]
    // Mutated: loop merges {retain:3}+{retain:4}={retain:7}, chop removes it, leaving [{retain:1,bold}]
    expect(result.ops).toEqual([
      { retain: 1, attributes: { bold: true } },
      { retain: 3 },
    ]);
  });
});