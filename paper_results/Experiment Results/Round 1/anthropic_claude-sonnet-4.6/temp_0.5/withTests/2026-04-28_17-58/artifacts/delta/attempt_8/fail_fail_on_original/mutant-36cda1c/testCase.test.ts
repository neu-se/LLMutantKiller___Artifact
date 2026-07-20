import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('does not treat embed as containing a newline one position ahead', () => {
    const lines: Delta[] = [];

    // If index=+1 for embed causes iter.next(1) instead of iter.next(),
    // and if somehow the iterator state differs, subsequent string processing changes
    const delta = new Delta()
      .insert('ab')
      .insert({ image: 'x' })
      .insert('cd\nef');

    delta.eachLine((line) => {
      lines.push(line);
    });

    expect(lines.length).toBe(1);
    expect(lines[0].ops).toEqual([
      { insert: 'ab' },
      { insert: { image: 'x' } },
      { insert: 'cd' },
    ]);
  });
});