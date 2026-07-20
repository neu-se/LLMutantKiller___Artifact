import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose()", () => {
  it("retain end optimization with trailing retain in rest", () => {
    // a has: insert(A), insert(B,bold), retain(5)
    // b retains only 1 char, so after processing insert(A) in start optimization
    // and insert(B,bold) in loop, otherIter is exhausted.
    // isEqual(last, newOp) is true for insert(B,bold).
    // rest = [retain(5)]
    // With optimization: concat pushes retain(5), then chop() removes it -> [A, B_bold]
    // Without optimization: loop processes retain(5) via else branch,
    // pushes retain(5), then chop() removes it -> [A, B_bold]
    // Both same... need different approach.
    //
    // Try: the optimization triggers and rest has retain(5) followed by insert(X)
    // concat: push retain(5) -> last=retain(5), append insert(X) directly
    // loop: push retain(5), push insert(X) via push() which moves insert before retain? No.
    // Actually push() only moves insert before DELETE, not retain.
    // So both give same result.
    //
    // Real difference: when rest.ops[0] merges with newOp creating a longer op,
    // and rest.ops[1] is the same type - but normalized delta prevents this.
    // Use non-normalized input where rest.ops[0] and rest.ops[1] are both plain inserts.
    const a = new Delta([
      { insert: "A" },
      { insert: "B", attributes: { bold: true } },
      { insert: "C" },
      { insert: "D" },
    ]);
    const b = new Delta().retain(1);
    const result = a.compose(b);

    // With optimization: push insert(C) merges with nothing (bold vs none),
    // then insert(D) appended directly without push -> no merge with insert(C)
    // Result: [A, B_bold, C, D] - 4 ops
    // Without optimization: push insert(C) -> [A, B_bold, C], push insert(D) -> merges -> [A, B_bold, CD]
    // Result: [A, B_bold, CD] - 3 ops
    expect(result.ops.length).toBe(3);
    expect(result.ops[2]).toEqual({ insert: "CD" });
  });
});