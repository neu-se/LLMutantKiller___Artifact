import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() mutation detection', () => {
  it('correctly processes embed followed by text before newline', () => {
    const lines: Delta[] = [];
    const attrs: Record<string, unknown>[] = [];

    const delta = new Delta()
      .insert({ image: 'pic.png' })
      .insert('text\n');

    delta.eachLine((line, lineAttrs) => {
      lines.push(line);
      attrs.push(lineAttrs);
    });

    expect(lines.length).toBe(1);
    expect(lines[0].ops).toEqual([
      { insert: { image: 'pic.png' } },
      { insert: 'text' },
    ]);
  });
});