import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q SES support", () => {
    it("should call ses.makeQ when ses is defined and ses.ok returns true", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        (globalThis as any).ses = { ok: () => true, makeQ: jest.fn() };

        // Act
        Q();

        // Assert
        expect((globalThis as any).ses.makeQ).toHaveBeenCalledTimes(1);

        // Cleanup
        (globalThis as any).ses = originalSES;
    });

    it("should not call ses.makeQ when ses is defined and ses.ok returns false", () => {
        // Arrange
        const originalSES = (globalThis as any).ses;
        (globalThis as any).ses = { ok: () => false, makeQ: jest.fn() };

        // Act
        Q();

        // Assert
        expect((globalThis as any).ses.makeQ).not.toHaveBeenCalled();

        // Cleanup
        (globalThis as any).ses = originalSES;
    });
});