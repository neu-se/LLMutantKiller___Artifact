import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should correctly compose when other starts with a retain with attributes", () => {
    // base has inserts that would be affected by the optimization block
    const base = new Delta()
      .insert("a")
      .insert("b")
      .insert("c");

    // other starts with a retain that has attributes (bold)
    // Original: firstOther.attributes != null => condition is false => skip optimization block
    // Mutated: firstOther != null is true => OR short-circuits => enters optimization block
    //          The optimization incorrectly moves inserts from thisIter to ops before processing
    //          then otherIter.next() skips part of the retain, losing the attributes application
    const other = new Delta().retain(3, { bold: true });

    const result = base.compose(other);

    // Expected: all three chars with bold attribute
    expect(result.ops).toEqual([
      { insert: "abc", attributes: { bold: true } }
    ]);
  });
});