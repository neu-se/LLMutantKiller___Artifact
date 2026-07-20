import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly process newline at start of insert operation", () => {
    const delta = new Delta().insert("\nabc");
    const lines: string[] = [];
    delta.eachLine((line) => {
      lines.push(line.ops.map(op => op.insert as string).join(''));
    });
    expect(lines).toEqual(["", "abc"]);
  });
});