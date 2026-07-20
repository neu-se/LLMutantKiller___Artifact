import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('should correctly split lines when newline is at the beginning', () => {
    const delta = new Delta().insert('\nHello');
    const lines: Array<Delta> = [];
    delta.eachLine((line) => {
      lines.push(line);
    });
    expect(lines.length).toBe(2);
    expect(lines[0].ops).toEqual([{ insert: '' }]);
    expect(lines[1].ops).toEqual([{ insert: 'Hello' }]);
  });
});