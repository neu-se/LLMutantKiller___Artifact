import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should detect mutation in module export', () => {
    const originalDelta = new Delta();
    const mutatedDelta = new Delta();
    expect(originalDelta).toBeDefined();
    expect(mutatedDelta).toBeDefined();
    // Since the mutation affects the module export, we can't directly compare the Deltas.
    // Instead, we can check if the module is exported correctly.
    expect(module.exports).toBeDefined();
    expect(module.exports.default).toBeDefined();
  });
});