import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("eachLine()", () => {
  it("should correctly handle newline at the beginning of text", () => {
    const delta = new Delta().insert("\nHello\nWorld");
    const lines: string[] = [];
    delta.eachLine((line) => {
      const content = line.ops[0]?.insert;
      lines.push(typeof content === 'string' ? content : '');
    });
    expect(lines).toEqual(["", "Hello", "World"]);
  });
});