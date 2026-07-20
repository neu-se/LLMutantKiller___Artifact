import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() embed followed by text before newline', () => {
  it('should correctly include embed and following text in the same line', () => {
    const lines: Delta[] = [];
    const attributes: Record<string, unknown>[] = [];

    const delta = new Delta()
      .insert({ image: 'photo.png' })
      .insert('caption')
      .insert('\n');

    delta.eachLine((line, attrs, _index) => {
      lines.push(line);
      attributes.push(attrs);
    });

    expect(lines.length).toBe(1);
    expect(lines[0].ops).toEqual([
      { insert: { image: 'photo.png' } },
      { insert: 'caption' },
    ]);
  });
});