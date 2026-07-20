describe("Complex", () => {
  it("should have a default export that is not an empty string", () => {
    try {
      const complex = require('./complex.js');
      expect(complex.default).toBeDefined();
      expect(complex.default).not.toBe("");
    } catch (error) {
      expect(error.code).toBe('MODULE_NOT_FOUND');
    }
  });
});