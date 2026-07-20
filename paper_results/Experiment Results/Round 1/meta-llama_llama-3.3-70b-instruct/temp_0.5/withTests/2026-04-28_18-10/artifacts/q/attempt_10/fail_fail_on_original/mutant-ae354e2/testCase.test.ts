describe("deprecate function", () => {
    it("should call console.warn with the correct arguments", () => {
        // Arrange
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        // Act
        const Q = require('../../../../q.js');
        const deprecatedFunction = Q.deprecate(() => {}, "testFunction", "newFunction");
        deprecatedFunction();

        // Assert
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("testFunction is deprecated, use newFunction instead"), expect.anything());

        // Clean up
        console.warn = originalWarn;
    });
});