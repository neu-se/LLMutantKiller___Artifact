import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("eachLine()", () => {
  it("should correctly handle newline at position 0 when text starts with newline character", () => {
    const delta = new Delta().insert("\nabc");
    const lines: Array<{ content: string, isEmpty: boolean }> = [];
    delta.eachLine((line, attributes, index) => {
      const content = line.ops.length > 0 && typeof line.ops[0].insert === 'string'
        ? line.ops[0].insert
        : "";
      lines.push({
        content,
        isEmpty: content.length === 0
      });
    });
    expect(lines).toEqual([
      { content: "", isEmpty: true },
      { content: "abc", isEmpty: false }
    ]);
  });
});