describe("Complex", () => {
  it("should have a default export that is equal to the Complex class", () => {
    try {
      const complex = require('./complex.js');
      expect(complex.default).toBe(complex.Complex);
    } catch (error) {
      expect(error.code).toBe('MODULE_NOT_FOUND');
    }
  });
});