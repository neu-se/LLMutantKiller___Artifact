import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() counting lines with embeds', () => {
  it('correctly counts line index when embed appears at start of line', () => {
    const lineIndices: number[] = [];
    const lineContents: Delta[] = [];

    // Two lines: first line is just an embed, second line has text
    const delta = new Delta()
      .insert({ image: 'photo.png' })
      .insert('\n')
      .insert('second line')
      .insert('\n');

    delta.eachLine((line, _attrs, index) => {
      lineIndices.push(index);
      lineContents.push(line);
    });

    expect(lineIndices).toEqual([0, 1]);
    expect(lineContents[0].ops).toEqual([{ insert: { image: 'photo.png' } }]);
    expect(lineContents[1].ops).toEqual([{ insert: 'second line' }]);
  });
});