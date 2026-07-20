import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q SES support", () => {
    it("should not throw an error when ses is not defined", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        delete (globalThis as any).ses;

        // Act and Assert
        expect(() => Q()).not.toThrow();

        // Cleanup
        (globalThis as any).ses = originalSES;
    });

    it("should call ses.makeQ when ses is defined and ses.ok returns true", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        const makeQSpy = jest.fn();
        (globalThis as any).ses = { ok: () => true, makeQ: makeQSpy };

        // Act
        Q();

        // Assert
        expect(makeQSpy).toHaveBeenCalledTimes(1);

        // Cleanup
        (globalThis as any).ses = originalSES;
    });

    it("should not call ses.makeQ when ses is defined and ses.ok returns false", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        const makeQSpy = jest.fn();
        (globalThis as any).ses = { ok: () => false, makeQ: makeQSpy };

        // Act
        Q();

        // Assert
        expect(makeQSpy).not.toHaveBeenCalled();

        // Cleanup
        (globalThis as any).ses = originalSES;
    });
});