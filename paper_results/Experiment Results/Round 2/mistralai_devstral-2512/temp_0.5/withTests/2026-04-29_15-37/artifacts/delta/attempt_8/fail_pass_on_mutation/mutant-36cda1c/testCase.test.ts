import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("eachLine()", () => {
  it("should correctly detect newline at position 0 in text", () => {
    const delta = new Delta().insert("test\nvalue");
    const lines: string[] = [];
    delta.eachLine((line) => {
      if (line.ops.length > 0 && typeof line.ops[0].insert === 'string') {
        lines.push(line.ops[0].insert);
      }
    });
    expect(lines).toEqual(["test", "value"]);
  });
});