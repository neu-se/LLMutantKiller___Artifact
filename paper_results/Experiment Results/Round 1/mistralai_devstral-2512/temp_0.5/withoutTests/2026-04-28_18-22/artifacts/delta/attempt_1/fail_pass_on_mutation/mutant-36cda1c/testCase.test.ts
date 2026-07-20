import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly handle newlines at the start of an insert operation", () => {
    const delta = new Delta().insert("\nhello");
    const lines: string[] = [];
    delta.eachLine((line) => {
      lines.push(line.ops.map(op => op.insert).join(''));
    });
    expect(lines).toEqual(["", "hello"]);
  });
});