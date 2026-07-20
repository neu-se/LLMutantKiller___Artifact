import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("eachLine()", () => {
  it("should correctly handle newline at position 0 when text starts with newline", () => {
    const delta = new Delta().insert("\nHello");
    const lines: string[] = [];
    delta.eachLine((line, attributes, index) => {
      if (line.ops.length > 0 && typeof line.ops[0].insert === 'string') {
        lines.push(line.ops[0].insert);
      }
    });
    expect(lines).toEqual(["", "Hello"]);
  });
});