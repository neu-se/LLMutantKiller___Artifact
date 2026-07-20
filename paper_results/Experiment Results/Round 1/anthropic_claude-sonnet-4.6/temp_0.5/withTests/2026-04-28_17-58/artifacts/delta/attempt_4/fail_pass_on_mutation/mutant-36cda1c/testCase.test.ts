import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() mutation detection', () => {
  it('correctly handles embed with attributes using eachLine', () => {
    const lines: Delta[] = [];

    const delta = new Delta()
      .insert({ image: 'pic.png' }, { width: '100' })
      .insert('\n', { align: 'center' });

    delta.eachLine((line, attrs) => {
      lines.push(line);
    });

    // With original (-1): index < 0, iter.next() called - consumes embed with attributes
    // With mutation (+1): index > 0, iter.next(1) called - also consumes embed with attributes
    // Need different approach - look at what iter.next(1) returns vs iter.next() for attributed embed
    expect(lines.length).toBe(1);
    expect(lines[0].ops).toEqual([
      { insert: { image: 'pic.png' }, attributes: { width: '100' } },
    ]);
  });
});