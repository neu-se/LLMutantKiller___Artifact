import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('should correctly handle newline at the start of text', () => {
    const delta = new Delta().insert('\nHello');
    const lines: Array<string> = [];
    delta.eachLine((line) => {
      const text = line.ops.reduce((acc, op) => {
        if (op.insert && typeof op.insert === 'string') {
          return acc + op.insert;
        }
        return acc;
      }, '');
      lines.push(text);
    });
    expect(lines).toEqual(['', 'Hello']);
  });
});