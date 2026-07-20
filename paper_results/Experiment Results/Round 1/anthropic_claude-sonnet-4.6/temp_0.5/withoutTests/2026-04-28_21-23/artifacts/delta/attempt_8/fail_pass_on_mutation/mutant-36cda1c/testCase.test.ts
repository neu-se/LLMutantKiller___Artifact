import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta eachLine', () => {
  it('should correctly handle embed followed by string with newline at position 1', () => {
    const delta = new Delta()
      .insert({ image: 'url' })
      .insert('a\n');

    const lines: Delta[] = [];
    delta.eachLine((line) => lines.push(line));

    expect(lines).toHaveLength(1);
    expect(lines[0].ops).toEqual([
      { insert: { image: 'url' } },
      { insert: 'a' },
    ]);
  });
});