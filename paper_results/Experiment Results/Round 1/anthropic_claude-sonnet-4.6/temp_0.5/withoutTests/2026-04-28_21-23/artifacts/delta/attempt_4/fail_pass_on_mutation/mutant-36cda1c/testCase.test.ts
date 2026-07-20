import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta eachLine', () => {
  it('should correctly handle embed followed by string starting with newline', () => {
    const delta = new Delta()
      .insert({ image: 'url' })
      .insert('\ntext');

    const lines: Delta[] = [];
    
    delta.eachLine((line) => {
      lines.push(line);
    });

    expect(lines).toHaveLength(2);
    expect(lines[0].ops).toEqual([{ insert: { image: 'url' } }]);
    expect(lines[1].ops).toEqual([{ insert: 'text' }]);
  });
});