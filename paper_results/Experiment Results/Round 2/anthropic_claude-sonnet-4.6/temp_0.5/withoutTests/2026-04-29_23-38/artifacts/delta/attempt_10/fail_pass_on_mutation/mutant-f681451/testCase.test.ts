import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transform: this=delete+retain, other=retain+retain - delete removes corresponding other retain', () => {
    const a = new Delta().delete(1).retain(1);
    const b = new Delta().retain(2);
    const result = a.transform(b, false);
    // Original: thisOp.delete → continue → other's retain(1) dropped
    // Mutated: thisOp.delete → empty if → else branch runs → retain(1) added
    expect(result.ops).toEqual([]);
  });
});