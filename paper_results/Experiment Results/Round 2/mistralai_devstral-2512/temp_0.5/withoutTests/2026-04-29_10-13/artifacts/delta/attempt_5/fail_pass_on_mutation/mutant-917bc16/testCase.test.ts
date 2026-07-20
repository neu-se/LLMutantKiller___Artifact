import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization', () => {
  it('should optimize composition when rest of other delta is just retain with matching attributes', () => {
    const delta1 = new Delta().insert('test', { bold: true }).retain(2, { italic: true });
    const delta2 = new Delta().retain(6);
    const result = delta1.compose(delta2);
    expect(result.ops.length).toBe(2);
    expect(result.ops[0]).toEqual({ insert: 'test', attributes: { bold: true } });
    expect(result.ops[1]).toEqual({ retain: 2, attributes: { italic: true } });
  });
});