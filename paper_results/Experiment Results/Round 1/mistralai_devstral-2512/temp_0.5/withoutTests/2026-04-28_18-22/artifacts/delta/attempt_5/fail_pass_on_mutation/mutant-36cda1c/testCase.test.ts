import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly process newline at start of text", () => {
    const delta = new Delta().insert("\nhello");
    const lines: string[] = [];
    delta.eachLine((line, attrs, index) => {
      lines.push({
        content: line.ops.map(op => op.insert as string).join(''),
        index,
        isFirstLine: index === 0
      });
    });
    expect(lines).toEqual([
      { content: "", index: 0, isFirstLine: true },
      { content: "hello", index: 1, isFirstLine: false }
    ]);
  });
});