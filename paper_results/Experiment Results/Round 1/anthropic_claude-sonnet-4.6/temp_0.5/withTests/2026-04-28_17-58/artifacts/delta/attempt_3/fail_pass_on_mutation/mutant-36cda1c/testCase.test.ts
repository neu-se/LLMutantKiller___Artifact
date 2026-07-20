import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() mutation detection', () => {
  it('handles embed at start of line where no newline follows within same op', () => {
    const lines: Delta[] = [];

    // Two embeds followed by newline - with mutation, second embed processing
    // will have index=1 but there's nothing after it before the newline op
    const delta = new Delta()
      .insert('\n')
      .insert({ image: 'a.png' })
      .insert({ image: 'b.png' })
      .insert('\n');

    delta.eachLine((line) => {
      lines.push(line);
    });

    expect(lines.length).toBe(2);
    expect(lines[0].ops).toEqual([]);
    expect(lines[1].ops).toEqual([
      { insert: { image: 'a.png' } },
      { insert: { image: 'b.png' } },
    ]);
  });
});