import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta eachLine', () => {
  it('should handle embed ops correctly in eachLine', () => {
    const delta = new Delta()
      .insert('text')
      .insert({ image: 'url' })
      .insert('\n');

    const lines: Delta[] = [];
    const attrs: object[] = [];
    
    delta.eachLine((line, attributes) => {
      lines.push(line);
      attrs.push(attributes);
    });

    expect(lines.length).toBe(1);
    expect(lines[0].ops).toHaveLength(2);
    expect(lines[0].ops[0]).toEqual({ insert: 'text' });
    expect(lines[0].ops[1]).toEqual({ insert: { image: 'url' } });
  });
});