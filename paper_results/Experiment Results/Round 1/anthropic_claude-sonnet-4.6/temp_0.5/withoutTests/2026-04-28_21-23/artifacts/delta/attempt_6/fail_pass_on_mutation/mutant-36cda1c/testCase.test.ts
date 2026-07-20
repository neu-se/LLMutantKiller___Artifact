import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta eachLine', () => {
  it('should correctly handle embed in last line with correct line index', () => {
    const delta = new Delta()
      .insert('line1\n')
      .insert({ image: 'url' });

    const lineIndices: number[] = [];
    const lines: Delta[] = [];
    
    delta.eachLine((line, attrs, i) => {
      lines.push(line);
      lineIndices.push(i);
    });

    expect(lines).toHaveLength(2);
    expect(lines[0].ops).toEqual([{ insert: 'line1' }]);
    expect(lines[1].ops).toEqual([{ insert: { image: 'url' } }]);
    expect(lineIndices).toEqual([0, 1]);
  });
});