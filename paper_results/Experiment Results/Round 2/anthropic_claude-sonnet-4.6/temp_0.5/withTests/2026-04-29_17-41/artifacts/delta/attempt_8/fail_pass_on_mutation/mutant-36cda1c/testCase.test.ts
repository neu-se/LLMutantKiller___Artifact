import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() with embed between two newlines checking attributes', () => {
  it('passes correct line attributes when embed is between newlines', () => {
    const capturedAttrs: Record<string, unknown>[] = [];
    const capturedLines: Delta[] = [];

    const delta = new Delta()
      .insert('\n', { align: 'left' })
      .insert({ image: 'photo.png' })
      .insert('\n', { align: 'right' });

    delta.eachLine((line, attrs) => {
      capturedLines.push(line);
      capturedAttrs.push(attrs);
    });

    expect(capturedLines.length).toBe(2);
    expect(capturedLines[0].ops).toEqual([]);
    expect(capturedAttrs[0]).toEqual({ align: 'left' });
    expect(capturedLines[1].ops).toEqual([{ insert: { image: 'photo.png' } }]);
    expect(capturedAttrs[1]).toEqual({ align: 'right' });
  });
});