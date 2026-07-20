import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta eachLine', () => {
  it('should correctly handle eachLine with embed after partially consumed string', () => {
    // 'a\n' has newline at position 1, so iter.next(1) is called for 'a'
    // Then the remaining '\n' triggers the else branch
    // Then the embed is processed
    const delta = new Delta()
      .insert('a\n')
      .insert({ image: 'url' })
      .insert('\n');

    const lines: Delta[] = [];
    delta.eachLine((line) => lines.push(line));

    expect(lines).toHaveLength(2);
    expect(lines[0].ops).toEqual([{ insert: 'a' }]);
    expect(lines[1].ops).toEqual([{ insert: { image: 'url' } }]);
  });
});