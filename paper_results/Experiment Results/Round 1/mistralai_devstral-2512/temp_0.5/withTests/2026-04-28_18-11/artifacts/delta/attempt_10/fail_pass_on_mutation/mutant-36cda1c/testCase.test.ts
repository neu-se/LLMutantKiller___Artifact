import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('should correctly handle newline at position 0', () => {
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
    expect(lines).toEqual([
      { content: '', index: 0 },
      { content: 'Hello', index: 1 }
    ]);
  });
});