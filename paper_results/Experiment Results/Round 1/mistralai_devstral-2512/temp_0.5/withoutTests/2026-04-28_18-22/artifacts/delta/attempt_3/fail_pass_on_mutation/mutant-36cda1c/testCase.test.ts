import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly split lines when newline appears at index 0", () => {
    const delta = new Delta().insert("\nabc");
    const lines: string[] = [];
    delta.eachLine((line) => {
      lines.push(line.ops.map(op => op.insert as string).join(''));
    });
    expect(lines).toEqual(["", "abc"]);
  });
});