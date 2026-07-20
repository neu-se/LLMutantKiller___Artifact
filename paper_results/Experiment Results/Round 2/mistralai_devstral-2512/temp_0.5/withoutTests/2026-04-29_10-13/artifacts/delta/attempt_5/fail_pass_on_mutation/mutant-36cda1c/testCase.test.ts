import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly handle newline at index 0 in insert operation", () => {
    const delta = new Delta().insert("\nhello");
    const lines: string[] = [];
    delta.eachLine((line) => {
      lines.push(line.ops.map(op => op.insert as string).join(''));
    }, "\n");
    expect(lines).toEqual(["", "hello"]);
  });
});