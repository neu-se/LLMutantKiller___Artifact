import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("eachLine()", () => {
  it("should correctly handle newline at position 0 when text starts with newline", () => {
    const delta = new Delta().insert("\nHello");
    const lines: string[] = [];
    delta.eachLine((line) => {
      lines.push(line.ops[0].insert as string);
    });
    expect(lines).toEqual(["", "Hello"]);
  });
});