import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('should correctly handle newline at the start of text', () => {
    const delta = new Delta().insert('\nHello');
    const lines: Array<{ line: Delta, index: number }> = [];
    delta.eachLine((line, attributes, index) => {
      lines.push({ line: new Delta(line.ops), index });
    });
    expect(lines.length).toBe(2);
    expect(lines[0].line.ops).toEqual([{ insert: '' }]);
    expect(lines[1].line.ops).toEqual([{ insert: 'Hello' }]);
  });
});