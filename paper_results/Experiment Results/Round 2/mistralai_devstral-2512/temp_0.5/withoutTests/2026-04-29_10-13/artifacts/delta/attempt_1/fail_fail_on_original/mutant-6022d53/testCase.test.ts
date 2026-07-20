import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transformPosition', () => {
  it('should correctly transform position when insert operation is present with priority', () => {
    const delta = new Delta();
    delta.insert('abc');
    delta.insert('def');

    const result = delta.transformPosition(2, true);
    expect(result).toBe(5);
  });
});