const complex = require('./complex.js');

describe("Complex", () => {
  it("should have the correct ES module definition", () => {
    expect(Object.getOwnPropertyDescriptor(complex, '__esModule')).toBeDefined();
    expect(Object.getOwnPropertyDescriptor(complex, '__esModule').value).toBe(true);
  });
});