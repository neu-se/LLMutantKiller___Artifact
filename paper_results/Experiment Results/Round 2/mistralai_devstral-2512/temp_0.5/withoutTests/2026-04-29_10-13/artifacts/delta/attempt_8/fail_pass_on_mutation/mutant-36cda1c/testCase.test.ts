import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly handle newline at index 0 with multiple operations", () => {
    const delta = new Delta()
      .insert("\n")
      .insert("test");
    const lines: string[] = [];
    delta.eachLine((line) => {
      lines.push(line.ops.map(op => op.insert as string).join(''));
    });
    expect(lines).toEqual(["", "test"]);
  });
});