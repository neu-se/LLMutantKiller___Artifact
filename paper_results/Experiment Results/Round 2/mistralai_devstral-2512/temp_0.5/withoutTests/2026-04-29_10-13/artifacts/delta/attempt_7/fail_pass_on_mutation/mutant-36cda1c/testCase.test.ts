import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly split lines when newline appears at start of first insert", () => {
    const delta = new Delta().insert("\nfirst\nsecond");
    const lines: string[] = [];
    delta.eachLine((line) => {
      lines.push(line.ops.map(op => op.insert as string).join(''));
    });
    expect(lines).toEqual(["", "first", "second"]);
  });
});