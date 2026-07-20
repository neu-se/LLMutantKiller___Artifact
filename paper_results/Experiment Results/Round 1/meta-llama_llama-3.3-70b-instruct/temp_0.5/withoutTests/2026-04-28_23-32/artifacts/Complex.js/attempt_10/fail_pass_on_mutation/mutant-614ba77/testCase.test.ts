describe("Complex", () => {
  it("should have a default export with a prototype chain that includes the Complex class", () => {
    try {
      const complex = require('./complex.js');
      let proto = Object.getPrototypeOf(complex.default);
      let found = false;
      while (proto !== null) {
        if (proto.constructor.name === 'Complex') {
          found = true;
          break;
        }
        proto = Object.getPrototypeOf(proto);
      }
      expect(found).toBe(true);
    } catch (error) {
      expect(error.code).toBe('MODULE_NOT_FOUND');
    }
  });
});