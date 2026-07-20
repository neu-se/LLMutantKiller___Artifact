import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transformPosition', () => {
  it('should correctly transform position with insert operation and priority', () => {
    const delta = new Delta();
    delta.insert('abc');
    delta.insert('def');

    const result = delta.transformPosition(2, true);
    expect(result).toBe(8);
  });
});