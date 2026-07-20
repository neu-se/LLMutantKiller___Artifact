import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta module exports', () => {
  it('module.exports.default should equal module.exports (CommonJS interop)', () => {
    const DeltaRequired = require('../../../../../../../../../../../subject_repositories/delta/src/Delta.ts');
    // In original: module.exports = Delta (a function), module.exports.default = Delta
    // So DeltaRequired === DeltaRequired.default
    // In mutated: module.exports is the plain exports object { default: Delta, __esModule: true }
    // DeltaRequired !== DeltaRequired.default
    expect(DeltaRequired).toBe(DeltaRequired.default);
  });
});