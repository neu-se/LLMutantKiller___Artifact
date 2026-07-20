import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('correctly handles embed between two string ops where second string starts with newline', () => {
    const lines: Delta[] = [];

    // String op with no newline, then embed, then string starting with newline
    // With original: embed index=-1, iter.next() consumes embed
    // With mutation: embed index=+1, iter.next(1) consumes embed
    // Then '\nworld': start=0, index=0 -> predicate called
    // These should be identical... unless the start calculation differs
    const delta = new Delta()
      .insert('hello')
      .insert({ image: 'x' })
      .insert('\nworld');

    delta.eachLine((line) => {
      lines.push(line);
    });

    expect(lines.length).toBe(1);
    expect(lines[0].ops).toEqual([
      { insert: 'hello' },
      { insert: { image: 'x' } },
    ]);
  });
});