import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should export Delta correctly with module.exports and module.exports.default pointing to the same class', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require('../../../../../../../../../../../subject_repositories/delta/src/Delta.ts');
    // In original: module.exports = Delta only when typeof module === 'object'
    // In mutated: module.exports = Delta always (if(true))
    // Both execute in Node.js, but the default export should still work
    const delta = new Delta([{ insert: 'hello' }]);
    expect(delta.ops).toEqual([{ insert: 'hello' }]);
    expect(required).toBe(Delta);
    expect(required.default).toBe(Delta);
  });
});