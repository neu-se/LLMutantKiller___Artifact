import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("eachLine()", () => {
  it("should correctly split text starting with newline", () => {
    const delta = new Delta().insert("\nHello");
    const lines: string[] = [];
    delta.eachLine((line) => {
      const content = line.ops.length > 0 ? line.ops[0].insert : "";
      lines.push(typeof content === 'string' ? content : "");
    });
    expect(lines).toEqual(["", "Hello"]);
  });
});