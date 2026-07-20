import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('transform where this is longer than other, checking intermediate retain values', () => {
    const a = new Delta().retain(5);
    const b = new Delta().retain(3, { bold: true });
    
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: 3, attributes: { bold: true } }]);
  });
});