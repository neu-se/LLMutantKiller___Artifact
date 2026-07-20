import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("eachLine()", () => {
  it("should correctly identify newline at position 0", () => {
    const delta = new Delta().insert("test\nvalue");
    const lines: string[] = [];
    delta.eachLine((line) => {
      lines.push(line.ops[0].insert as string);
    });
    expect(lines).toEqual(["test", "value"]);
  });
});