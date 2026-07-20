import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
    it("should call console.warn with the correct arguments", () => {
        // Arrange
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        // Act
        const deprecatedFunction = Q.deprecate(() => {}, "testFunction", "newFunction");
        deprecatedFunction();

        // Assert
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(expect.stringMatching(/testFunction is deprecated/));

        // Clean up
        console.warn = originalWarn;
    });
});