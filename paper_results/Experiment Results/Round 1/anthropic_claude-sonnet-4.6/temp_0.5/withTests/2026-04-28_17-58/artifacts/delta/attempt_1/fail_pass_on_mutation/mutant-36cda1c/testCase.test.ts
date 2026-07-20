import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() with embed ops', () => {
  it('correctly handles embed ops by treating them as non-newline content', () => {
    const lines: Delta[] = [];
    const delta = new Delta()
      .insert('Hello')
      .insert({ image: 'octocat.png' })
      .insert('\n');

    delta.eachLine((line) => {
      lines.push(line);
    });

    // With original code: embed has index = -1, so iter.next() consumes the whole embed
    // The line should contain 'Hello' + the image embed
    expect(lines.length).toBe(1);
    expect(lines[0].ops).toEqual([
      { insert: 'Hello' },
      { insert: { image: 'octocat.png' } },
    ]);
  });
});