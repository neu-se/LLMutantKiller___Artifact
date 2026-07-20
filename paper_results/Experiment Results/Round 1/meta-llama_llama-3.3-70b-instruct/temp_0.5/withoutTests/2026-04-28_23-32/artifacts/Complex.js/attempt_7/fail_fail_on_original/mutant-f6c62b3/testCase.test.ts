const complex = require('./complex.js');

describe("Complex", () => {
  it("should have the correct ES module definition", () => {
    expect(complex).toBeDefined();
    expect(complex.__esModule).toBeDefined();
    expect(complex.__esModule).toBe(true);
  });
});