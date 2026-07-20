import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly handle newlines at the start of insert operations", () => {
    const delta = new Delta().insert("\nhello\nworld");
    const lines: string[] = [];
    delta.eachLine((line) => {
      lines.push(line.ops.map(op => op.insert).join(''));
    });
    expect(lines).toEqual(["", "hello", "world"]);
  });
});