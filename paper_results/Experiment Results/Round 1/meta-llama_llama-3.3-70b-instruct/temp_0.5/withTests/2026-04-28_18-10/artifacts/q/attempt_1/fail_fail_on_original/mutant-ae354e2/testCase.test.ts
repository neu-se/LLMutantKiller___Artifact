import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should throw an error when console.warn is called with the correct arguments", () => {
        // Arrange
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        // Act
        const deprecatedFunction = Q.deprecate(() => {}, "testFunction", "newFunction");
        deprecatedFunction();

        // Assert
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith("testFunction is deprecated, use newFunction instead.", new Error().stack);

        // Clean up
        console.warn = originalWarn;
    });
});