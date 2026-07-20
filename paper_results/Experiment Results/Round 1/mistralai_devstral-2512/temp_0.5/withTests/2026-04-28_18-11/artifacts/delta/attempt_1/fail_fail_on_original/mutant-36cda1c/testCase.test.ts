import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('should correctly handle newline at start of text', () => {
    const delta = new Delta().insert('\nHello');
    const lines: Array<[Delta, Record<string, unknown>, number]> = [];
    delta.eachLine((line, attributes, index) => {
      lines.push([line, attributes, index]);
    });
    expect(lines.length).toBe(2);
    expect(lines[0][0].ops).toEqual([{ insert: '' }]);
    expect(lines[1][0].ops).toEqual([{ insert: 'Hello' }]);
  });
});