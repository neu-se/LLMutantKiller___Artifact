import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta eachLine with embed', () => {
  it('should include embed objects in the current line when no newline follows', () => {
    // Create a delta with a text, an embed object, and then a newline
    const delta = new Delta()
      .insert('Hello ')
      .insert({ image: 'url' })
      .insert('\nWorld');

    const lines: Delta[] = [];
    const lineAttrs: object[] = [];

    delta.eachLine((line, attributes) => {
      lines.push(line);
      lineAttrs.push(attributes);
    });

    // With original code (-1): embed index is -1, so index < 0, embed is pushed to current line
    // First line should contain 'Hello ' and the embed
    expect(lines.length).toBe(2);
    
    // The first line should contain both 'Hello ' and the embed {image: 'url'}
    expect(lines[0].ops).toEqual([
      { insert: 'Hello ' },
      { insert: { image: 'url' } },
    ]);
    
    // The second line should contain 'World'
    expect(lines[1].ops).toEqual([
      { insert: 'World' },
    ]);
  });
});