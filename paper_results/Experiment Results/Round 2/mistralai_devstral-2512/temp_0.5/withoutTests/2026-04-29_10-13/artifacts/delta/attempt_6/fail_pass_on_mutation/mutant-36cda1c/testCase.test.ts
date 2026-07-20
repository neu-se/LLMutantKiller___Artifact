import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly identify newline at position 0", () => {
    const delta = new Delta().insert("\ntest");
    const lines: { content: string, index: number }[] = [];
    delta.eachLine((line, attrs, i) => {
      lines.push({ content: line.ops.map(op => op.insert as string).join(''), index: i });
    });
    expect(lines).toEqual([{ content: "", index: 0 }, { content: "test", index: 1 }]);
  });
});