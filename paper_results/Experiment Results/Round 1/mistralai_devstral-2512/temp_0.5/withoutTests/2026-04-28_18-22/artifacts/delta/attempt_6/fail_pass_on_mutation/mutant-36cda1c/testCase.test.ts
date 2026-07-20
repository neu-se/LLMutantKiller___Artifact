import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta eachLine", () => {
  it("should correctly identify newline at index 0 in insert operation", () => {
    const delta = new Delta().insert("\ntest");
    const results: Array<{ line: string, index: number }> = [];
    delta.eachLine((line, attrs, idx) => {
      results.push({
        line: line.ops.map(op => op.insert as string).join(''),
        index: idx
      });
    });
    expect(results).toEqual([
      { line: "", index: 0 },
      { line: "test", index: 1 }
    ]);
  });
});