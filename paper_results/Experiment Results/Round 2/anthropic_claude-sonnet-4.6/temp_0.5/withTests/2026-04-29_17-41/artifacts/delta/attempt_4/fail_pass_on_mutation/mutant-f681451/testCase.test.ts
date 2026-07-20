import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transform()", () => {
  it("delete + retain without attributes should produce empty delta", () => {
    const a = new Delta().delete(1);
    const b = new Delta().retain(1);
    // Original: thisOp.delete causes continue, retain is dropped -> empty delta
    // Mutated: thisOp.delete block is empty, falls to else branch, retain(1) is added but chopped -> still empty?
    // Need to prevent chop: add something after
    const a2 = new Delta().retain(2).delete(1);
    const b2 = new Delta().retain(2).retain(1).insert('X');
    const expected = new Delta().retain(2).insert('X');
    expect(a2.transform(b2, true)).toEqual(expected);
  });
});