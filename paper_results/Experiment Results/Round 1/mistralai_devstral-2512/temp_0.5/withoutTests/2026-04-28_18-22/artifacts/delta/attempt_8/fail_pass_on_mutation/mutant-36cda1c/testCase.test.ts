import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly split when newline is first character", () => {
    const delta = new Delta().insert("\ntest content");
    const lines: string[] = [];
    delta.eachLine((line, attrs, index) => {
      lines.push(line.ops.map(op => op.insert as string).join(''));
    });
    expect(lines).toEqual(["", "test content"]);
  });
});