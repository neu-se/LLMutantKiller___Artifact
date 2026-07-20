import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q SES support", () => {
    it("should not throw an error when ses is not defined", () => {
        // Arrange
        const originalSES = globalThis.ses;
        delete globalThis.ses;

        // Act and Assert
        expect(() => Q()).not.toThrow();

        // Cleanup
        globalThis.ses = originalSES;
    });

    it("should call ses.makeQ when ses is defined", () => {
        // Arrange
        const originalSES = globalThis.ses;
        globalThis.ses = { ok: () => true };
        const makeQSpy = jest.fn();
        globalThis.ses.makeQ = makeQSpy;

        // Act
        Q();

        // Assert
        expect(makeQSpy).toHaveBeenCalledTimes(1);

        // Cleanup
        globalThis.ses = originalSES;
    });

    it("should not call ses.makeQ when ses.ok returns false", () => {
        // Arrange
        const originalSES = globalThis.ses;
        globalThis.ses = { ok: () => false };
        const makeQSpy = jest.fn();
        globalThis.ses.makeQ = makeQSpy;

        // Act
        Q();

        // Assert
        expect(makeQSpy).not.toHaveBeenCalled();

        // Cleanup
        globalThis.ses = originalSES;
    });
});