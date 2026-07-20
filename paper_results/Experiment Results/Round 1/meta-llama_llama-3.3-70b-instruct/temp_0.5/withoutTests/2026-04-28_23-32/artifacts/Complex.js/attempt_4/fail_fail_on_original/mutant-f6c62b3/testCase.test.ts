const complexModule = require('./complex.js');

describe("Complex", () => {
  it("should have the correct ES module definition", () => {
    expect(Object.keys(complexModule)).toContain('__esModule');
    expect(complexModule.__esModule).toBe(true);
  });
});