import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose()", () => {
  it("retain end optimization handles remaining ops correctly", () => {
    // Non-normalized delta: insert(B,bold) is followed by delete(1) then insert(C)
    // In the optimization path, rest = [delete(1), insert(C)]
    // concat pushes delete(1) -> last op is delete(1)
    // then appends insert(C) directly WITHOUT push() reordering
    // Result: [..., delete(1), insert(C)]
    //
    // Without optimization: loop hits delete branch directly pushing delete(1),
    // then processes insert(C) through push() which moves insert before delete
    // Result: [..., insert(C), delete(1)]
    const a = new Delta([
      { insert: "A" },
      { insert: "B", attributes: { bold: true } },
      { delete: 1 },
      { insert: "C" },
    ]);
    const b = new Delta().retain(1);
    const result = a.compose(b);

    expect(result.ops).toEqual([
      { insert: "A" },
      { insert: "B", attributes: { bold: true } },
      { delete: 1 },
      { insert: "C" },
    ]);
  });
});