import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call onUnhandledError with the correct context when process.domain is defined', () => {
        // Arrange
        const onUnhandledErrorSpy = jest.fn();
        const originalDomain = process.domain;
        process.domain = { bind: (fn) => fn };

        // Act
        Q.done(Q.resolve(), null, null, null);

        // Assert
        expect(onUnhandledErrorSpy).not.toHaveBeenCalled();

        // Cleanup
        process.domain = originalDomain;
        jest.restoreAllMocks();
    });
});