import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('should correctly handle newline at position 0', () => {
    const delta = new Delta().insert('Hello\nWorld');
    const lines: Array<{ line: string, index: number }> = [];
    delta.eachLine((line, attributes, index) => {
      const text = line.ops.reduce((acc, op) => {
        if (op.insert && typeof op.insert === 'string') {
          return acc + op.insert;
        }
        return acc;
      }, '');
      lines.push({ line: text, index });
    });
    expect(lines).toEqual([
      { line: 'Hello', index: 0 },
      { line: 'World', index: 1 }
    ]);
  });
});