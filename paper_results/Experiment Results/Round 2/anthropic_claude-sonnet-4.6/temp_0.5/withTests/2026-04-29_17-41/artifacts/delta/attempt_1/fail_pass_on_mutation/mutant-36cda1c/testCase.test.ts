import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() with embed ops', () => {
  it('should include embed in current line content, not treat it as a line boundary', () => {
    const lines: Delta[] = [];
    const delta = new Delta()
      .insert('Hello')
      .insert({ image: 'octocat.png' })
      .insert('\n');

    delta.eachLine((line, _attributes, _index) => {
      lines.push(line);
    });

    expect(lines.length).toBe(1);
    const firstLine = lines[0];
    expect(firstLine.ops).toEqual([
      { insert: 'Hello' },
      { insert: { image: 'octocat.png' } },
    ]);
  });
});