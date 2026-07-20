import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() with embed immediately before newline', () => {
  it('should include embed in line content when embed is immediately before newline', () => {
    const lines: Delta[] = [];

    const delta = new Delta()
      .insert('text')
      .insert({ image: 'photo.png' })
      .insert('\n', { align: 'center' })
      .insert('after');

    delta.eachLine((line, _attrs, _index) => {
      lines.push(line);
    });

    // With original code: first line contains 'text' + embed
    // With mutated code: embed is consumed with index=1, then next iter sees '\n' at index=0
    // which triggers the newline branch - but the newline op's attributes would be lost
    // because iter.next(1) on the '\n' op consumes just 1 char without triggering line completion
    expect(lines.length).toBe(2);
    expect(lines[0].ops).toEqual([
      { insert: 'text' },
      { insert: { image: 'photo.png' } },
    ]);
    expect(lines[1].ops).toEqual([{ insert: 'after' }]);
  });
});