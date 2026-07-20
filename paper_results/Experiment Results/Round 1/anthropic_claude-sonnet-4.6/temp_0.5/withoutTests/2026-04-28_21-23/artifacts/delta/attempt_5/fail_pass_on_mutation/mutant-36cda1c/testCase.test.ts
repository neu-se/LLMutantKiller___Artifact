import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta eachLine', () => {
  it('should process embed ops correctly when followed by text with newline', () => {
    // Create a delta: embed + 'a\n' + 'b'
    // The string 'a\n' has newline at index 1, which is the same as
    // the mutated embed behavior (index = +1)
    const delta = new Delta()
      .insert({ image: 'url' })
      .insert('a\n')
      .insert('b');

    const lines: Delta[] = [];
    const lineAttrs: object[] = [];
    
    delta.eachLine((line, attrs) => {
      lines.push(line);
      lineAttrs.push(attrs);
    });

    expect(lines).toHaveLength(2);
    expect(lines[0].ops).toEqual([
      { insert: { image: 'url' } },
      { insert: 'a' },
    ]);
    expect(lines[1].ops).toEqual([{ insert: 'b' }]);
  });
});