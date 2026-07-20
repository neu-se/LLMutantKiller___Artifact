import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() with two consecutive embeds', () => {
  it('should place both embeds in the same line when no newline between them', () => {
    const lines: Delta[] = [];

    const delta = new Delta()
      .insert({ image: 'a.png' })
      .insert({ image: 'b.png' })
      .insert('\n');

    delta.eachLine((line) => {
      lines.push(line);
    });

    expect(lines.length).toBe(1);
    expect(lines[0].ops).toEqual([
      { insert: { image: 'a.png' } },
      { insert: { image: 'b.png' } },
    ]);
  });
});