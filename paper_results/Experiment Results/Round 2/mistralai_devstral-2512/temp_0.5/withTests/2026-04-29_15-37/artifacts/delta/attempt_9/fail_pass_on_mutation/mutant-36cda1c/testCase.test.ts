import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("eachLine()", () => {
  it("should correctly handle newline at exact position 0", () => {
    const delta = new Delta().insert("a\nb");
    const lines: string[] = [];
    delta.eachLine((line) => {
      if (line.ops.length > 0 && typeof line.ops[0].insert === 'string') {
        lines.push(line.ops[0].insert);
      }
    });
    expect(lines).toEqual(["a", "b"]);
  });
});