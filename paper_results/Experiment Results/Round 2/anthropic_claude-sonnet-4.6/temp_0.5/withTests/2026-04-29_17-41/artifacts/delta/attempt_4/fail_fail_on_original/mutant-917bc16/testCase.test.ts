import Delta from "../../src/Delta";

describe("compose()", () => {
  it("retain end optimization produces correct result when rest has multiple ops", () => {
    // Use a non-normalized delta constructed directly to have delete before insert
    // in the ops that will become rest.ops.slice(1)
    const a = new Delta([
      { insert: "A" },
      { insert: "B", attributes: { bold: true } },
      { delete: 1 },
      { insert: "C" },
    ]);
    const b = new Delta().retain(1);
    const result = a.compose(b);

    // With the optimization (original): concat appends rest.ops.slice(1) directly,
    // preserving delete-before-insert order => [insert(A), insert(B,bold), delete(1), insert(C)]
    // Without the optimization (mutated): loop pushes each op through push() which
    // reorders insert before delete => [insert(A), insert(B,bold), insert(C), delete(1)]
    expect(result.ops).toEqual([
      { insert: "A" },
      { insert: "B", attributes: { bold: true } },
      { delete: 1 },
      { insert: "C" },
    ]);
  });
});