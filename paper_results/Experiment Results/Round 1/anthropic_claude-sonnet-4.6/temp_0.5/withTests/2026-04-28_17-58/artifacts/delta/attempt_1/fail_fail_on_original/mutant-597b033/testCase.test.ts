import Delta from "../../src/Delta";

describe('Delta module export', () => {
  it('should export Delta as default with correct module.exports.default reference', () => {
    // In Node.js, typeof module === 'object' is true, so both original and mutant behave the same.
    // However, we can verify the module structure is correct by checking
    // that the default export is the Delta constructor and works properly.
    // The mutation changes `if (typeof module === 'object')` to `if (true)`.
    // In Node.js both are equivalent, so we test the actual Delta behavior
    // to ensure the module loads correctly.
    const delta = new Delta().insert('hello');
    expect(delta.ops).toEqual([{ insert: 'hello' }]);
    
    // Verify module.exports.default is set (this is set by the conditional block)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const DeltaModule = require('../../src/Delta');
    expect(DeltaModule).toBe(Delta);
    expect(DeltaModule.default).toBe(Delta);
  });
});