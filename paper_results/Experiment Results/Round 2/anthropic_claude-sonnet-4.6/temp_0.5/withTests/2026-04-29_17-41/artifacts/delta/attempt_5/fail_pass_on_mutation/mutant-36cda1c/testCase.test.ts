import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() final line with only an embed and no trailing newline', () => {
  it('should call predicate with embed-only final line', () => {
    const lines: Delta[] = [];

    const delta = new Delta()
      .insert('Hello\n')
      .insert({ image: 'photo.png' });

    delta.eachLine((line) => {
      lines.push(line);
    });

    expect(lines.length).toBe(2);
    expect(lines[0].ops).toEqual([{ insert: 'Hello' }]);
    expect(lines[1].ops).toEqual([{ insert: { image: 'photo.png' } }]);
  });
});