import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('should correctly handle newline at the beginning of text', () => {
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
    expect(lines).toEqual([
      { text: '', index: 0 },
      { text: 'Hello', index: 1 }
    ]);
  });
});