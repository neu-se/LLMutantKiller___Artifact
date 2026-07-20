import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() with custom newline and embed', () => {
  it('correctly splits lines using custom newline character with embeds present', () => {
    const lines: Delta[] = [];

    // Use custom newline '|' so we can control positioning precisely
    // embed op followed by '|' as newline
    const delta = new Delta()
      .insert({ image: 'a.png' })
      .insert('|')
      .insert('after');

    delta.eachLine((line) => {
      lines.push(line);
    }, '|');

    expect(lines.length).toBe(2);
    expect(lines[0].ops).toEqual([{ insert: { image: 'a.png' } }]);
    expect(lines[1].ops).toEqual([{ insert: 'after' }]);
  });
});