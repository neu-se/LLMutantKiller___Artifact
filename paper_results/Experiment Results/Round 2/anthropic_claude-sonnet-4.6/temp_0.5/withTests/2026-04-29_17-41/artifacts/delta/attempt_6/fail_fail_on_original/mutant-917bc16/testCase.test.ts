import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("compose()", () => {
  it("retain end optimization correctly merges remaining ops via concat", () => {
    // Construct a non-normalized delta directly where rest.ops[0] will merge
    // with newOp, and rest.ops[1] would also be mergeable in the loop path
    // but not in the concat path (direct append skips push merging).
    const a = new Delta([
      { insert: "A" },
      { insert: "B", attributes: { bold: true } },
      { insert: "C", attributes: { bold: true } },
      { insert: "D", attributes: { bold: true } },
    ]);
    const b = new Delta().retain(1);
    const result = a.compose(b);

    // With optimization: concat appends rest.ops.slice(1)=[insert(D,bold)] directly
    // after pushing rest.ops[0]=insert(C,bold) which merges with insert(B,bold)->insert(BC,bold).
    // insert(D,bold) is appended directly without merging with insert(BC,bold).
    // Result: [insert(A), insert(BC,bold), insert(D,bold)]  -- 3 ops
    //
    // Without optimization (mutated): loop pushes insert(C,bold)->merges->insert(BC,bold),
    // then pushes insert(D,bold)->merges->insert(BCD,bold).
    // Result: [insert(A), insert(BCD,bold)]  -- 2 ops
    expect(result.ops.length).toBe(2);
    expect(result.ops[1]).toEqual({ insert: "BCD", attributes: { bold: true } });
  });
});