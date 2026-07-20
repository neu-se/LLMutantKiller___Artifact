import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine()', () => {
  it('correctly handles newline op attributes when preceded by embed', () => {
    const attrs: Record<string, unknown>[] = [];

    const delta = new Delta()
      .insert({ image: 'pic.png' })
      .insert('\n', { align: 'center' });

    delta.eachLine((line, lineAttrs) => {
      attrs.push(lineAttrs);
    });

    expect(attrs.length).toBe(1);
    expect(attrs[0]).toEqual({ align: 'center' });
  });
});