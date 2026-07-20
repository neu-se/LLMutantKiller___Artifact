import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('should correctly handle newline at start of text with empty first line', () => {
    const delta = new Delta().insert('\nHello');
    const lines: Array<{ text: string, index: number }> = [];
    delta.eachLine((line, attributes, index) => {
      const text = line.ops.reduce((acc, op) => {
        if (op.insert && typeof op.insert === 'string') {
          return acc + op.insert;
        }
        return acc;
      }, '');
      lines.push({ text, index });
    });
    expect(lines.length).toBe(2);
    expect(lines[0].text).toBe('');
    expect(lines[1].text).toBe('Hello');
  });
});