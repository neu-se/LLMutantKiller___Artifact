import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta push method", () => {
  it("should correctly push operation when index equals ops length after retain merge", () => {
    const delta = new Delta();
    delta.retain(2, { bold: true });
    delta.push({ retain: 3, attributes: { bold: true } });
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual({ retain: 5, attributes: { bold: true } });
  });
});