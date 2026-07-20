import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose optimization', () => {
  it('should optimize composition when rest of other delta is just retain with matching operation', () => {
    const delta1 = new Delta().insert('Hello', { bold: true }).retain(3, { italic: true });
    const delta2 = new Delta().retain(8);
    const result = delta1.compose(delta2);
    expect(result.ops.length).toBe(2);
    expect(result.ops[0]).toEqual({ insert: 'Hello', attributes: { bold: true } });
    expect(result.ops[1]).toEqual({ retain: 3, attributes: { italic: true } });
  });
});