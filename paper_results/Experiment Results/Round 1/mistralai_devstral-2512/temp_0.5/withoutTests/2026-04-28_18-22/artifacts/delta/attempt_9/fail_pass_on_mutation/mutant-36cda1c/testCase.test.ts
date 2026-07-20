import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly process newline at exact start of insert operation", () => {
    const delta = new Delta().insert("\nhello");
    const results: Array<{ content: string, lineNumber: number }> = [];
    delta.eachLine((line, attrs, index) => {
      results.push({
        content: line.ops.map(op => op.insert as string).join(''),
        lineNumber: index
      });
    });
    expect(results).toEqual([
      { content: "", lineNumber: 0 },
      { content: "hello", lineNumber: 1 }
    ]);
  });
});