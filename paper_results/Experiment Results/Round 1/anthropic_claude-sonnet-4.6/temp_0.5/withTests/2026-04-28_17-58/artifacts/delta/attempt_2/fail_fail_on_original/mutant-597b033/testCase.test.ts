import Delta from "../../../../../../../../../../../../src/Delta";

describe('Delta module exports', () => {
  it('default export is the Delta constructor and creates instances correctly', () => {
    const delta = new Delta().insert('hello').insert(' world');
    expect(delta.ops).toEqual([{ insert: 'hello world' }]);
    expect(delta).toBeInstanceOf(Delta);
    
    // Verify module.exports structure set by the conditional block
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require("../../../../../../../../../../../../src/Delta");
    // In original: module.exports = Delta (the class), module.exports.default = Delta
    // Both original and mutant set this in Node.js, but verify the structure
    expect(typeof required).toBe('function');
    expect(required.default).toBe(required);
  });
});