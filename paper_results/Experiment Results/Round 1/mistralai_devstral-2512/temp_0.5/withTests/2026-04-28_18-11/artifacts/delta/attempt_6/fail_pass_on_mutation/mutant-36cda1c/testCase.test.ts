import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('should correctly handle newline at the start of text', () => {
    const delta = new Delta().insert('\nHello');
    const lines: Array<{ content: string, index: number }> = [];
    delta.eachLine((line, attributes, index) => {
      const content = line.ops.reduce((acc, op) => {
        if (op.insert && typeof op.insert === 'string') {
          return acc + op.insert;
        }
        return acc;
      }, '');
      lines.push({ content, index });
    });
    expect(lines.length).toBe(2);
    expect(lines[0].content).toBe('');
    expect(lines[1].content).toBe('Hello');
  });
});