import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('correctly processes content after a line containing only an embed', () => {
    const lines: Delta[] = [];

    const delta = new Delta()
      .insert({ image: 'x' })
      .insert('\n')
      .insert('hello')
      .insert('\n');

    delta.eachLine((line) => {
      lines.push(line);
    });

    expect(lines.length).toBe(2);
    expect(lines[0].ops).toEqual([{ insert: { image: 'x' } }]);
    expect(lines[1].ops).toEqual([{ insert: 'hello' }]);
  });
});