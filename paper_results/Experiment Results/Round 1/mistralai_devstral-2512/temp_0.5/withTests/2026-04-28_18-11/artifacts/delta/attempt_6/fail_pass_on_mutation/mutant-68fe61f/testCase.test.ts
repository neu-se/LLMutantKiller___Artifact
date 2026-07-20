import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta module export', () => {
  it('should have Delta constructor available', () => {
    // This test verifies that Delta is properly exported
    // The mutation changes the module export condition from 'object' to empty string
    // which should break the export in Node.js environments
    expect(typeof Delta).toBe('function');
    expect(Delta.prototype.constructor).toBe(Delta);

    const instance = new Delta();
    expect(instance instanceof Delta).toBe(true);
  });
});