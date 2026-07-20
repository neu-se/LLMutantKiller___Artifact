import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain where this is longer than other preserves correct retain value', () => {
    const a = new Delta().retain(5);
    const b = new Delta().retain(3, { bold: true });
    const result = a.transform(b, true);
    expect(result).toEqual(new Delta().retain(3, { bold: true }));
  });
});