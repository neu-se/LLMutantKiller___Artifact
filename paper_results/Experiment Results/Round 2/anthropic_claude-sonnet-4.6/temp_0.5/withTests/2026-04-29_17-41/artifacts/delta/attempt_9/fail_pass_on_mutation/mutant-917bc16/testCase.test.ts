import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose()", () => {
  it("retain end optimization with non-normalized consecutive same-type ops in rest", () => {
    // Non-normalized delta with two consecutive plain inserts after insert(B,bold)
    // Optimization triggers after processing insert(B,bold):
    //   rest = [insert(C), insert(D)]
    //   concat: push insert(C) -> [A, B_bold, C], then append insert(D) directly -> [A, B_bold, C, D] (4 ops)
    // Without optimization (mutated): loop pushes insert(C) -> [A, B_bold, C],
    //   then pushes insert(D) via push() -> merges with insert(C) -> [A, B_bold, CD] (3 ops)
    const a = new Delta([
      { insert: "A" },
      { insert: "B", attributes: { bold: true } },
      { insert: "C" },
      { insert: "D" },
    ]);
    const b = new Delta().retain(1);
    const result = a.compose(b);

    // Original (optimization): 4 ops - insert(D) appended directly without merging
    expect(result.ops.length).toBe(4);
    expect(result.ops[2]).toEqual({ insert: "C" });
    expect(result.ops[3]).toEqual({ insert: "D" });
  });
});