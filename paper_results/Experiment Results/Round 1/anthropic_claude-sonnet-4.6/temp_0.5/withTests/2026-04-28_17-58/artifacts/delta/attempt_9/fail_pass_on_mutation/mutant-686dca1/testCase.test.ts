import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('the default import should be the Delta constructor with insert method', () => {
    // Test that Delta works correctly as imported
    // This verifies the module loads without errors under both conditions
    const delta = new Delta().insert('hello');
    expect(delta.ops).toEqual([{ insert: 'hello' }]);

    // The critical test: with the mutation, when module IS an object (Node.js),
    // the block is skipped. But the block also contains module.exports.default = Delta.
    // Without it running, module.exports.default might differ from what TS sets.
    // 
    // ts-jest uses its own module system - let's verify via a fresh isolated require
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fresh = require('../../../../../../../../../../../../../subject_repositories/delta/src/Delta');
      // Original sets module.exports = Delta (a function), then module.exports.default = Delta
      // So fresh should be a function
      expect(typeof fresh).toBe('function');
    });
  });
});