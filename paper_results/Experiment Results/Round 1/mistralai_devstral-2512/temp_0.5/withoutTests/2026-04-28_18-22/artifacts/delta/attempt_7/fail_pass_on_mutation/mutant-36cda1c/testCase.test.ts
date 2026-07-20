import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly handle newline at exact start position", () => {
    const delta = new Delta().insert("\nabc");
    const lines: string[] = [];
    const indices: number[] = [];
    delta.eachLine((line, attrs, index) => {
      lines.push(line.ops.map(op => op.insert as string).join(''));
      indices.push(index);
    });
    expect(lines).toEqual(["", "abc"]);
    expect(indices).toEqual([0, 1]);
  });
});