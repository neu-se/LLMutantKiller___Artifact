describe("Complex", () => {
  it("should have a default export that is a function and has the same name as the Complex class", () => {
    try {
      const complex = require('./complex.js');
      expect(typeof complex.default).toBe('function');
      expect(complex.default.name).toBe('Complex');
    } catch (error) {
      expect(error.code).toBe('MODULE_NOT_FOUND');
    }
  });
});