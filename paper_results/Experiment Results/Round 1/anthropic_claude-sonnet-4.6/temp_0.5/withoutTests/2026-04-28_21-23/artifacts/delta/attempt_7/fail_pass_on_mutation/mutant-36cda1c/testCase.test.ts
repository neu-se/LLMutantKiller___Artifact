import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta eachLine', () => {
  it('should process embed ops correctly in eachLine', () => {
    const delta = new Delta()
      .insert('text\n')
      .insert({ image: 'url' });

    const lines: Delta[] = [];
    delta.eachLine((line) => lines.push(line));

    expect(lines).toHaveLength(2);
    expect(lines[0].ops).toEqual([{ insert: 'text' }]);
    expect(lines[1].ops).toEqual([{ insert: { image: 'url' } }]);
  });
});