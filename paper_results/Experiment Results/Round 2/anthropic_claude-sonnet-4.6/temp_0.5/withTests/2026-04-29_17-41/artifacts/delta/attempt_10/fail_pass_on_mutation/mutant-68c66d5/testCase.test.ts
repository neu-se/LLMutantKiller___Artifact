import Delta from '../../../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta CommonJS module export', () => {
  it('Delta class should have a .default property pointing to itself after module.exports.default is set', () => {
    // In the original code:
    //   module.exports = Delta        (sets module.exports to Delta class)
    //   module.exports.default = Delta (sets Delta.default = Delta)
    // So Delta.default === Delta
    //
    // In the mutated code (if (false)):
    //   Neither line runs
    //   Delta.default is never set
    //   So Delta.default === undefined
    
    expect((Delta as any).default).toBe(Delta);
  });
});