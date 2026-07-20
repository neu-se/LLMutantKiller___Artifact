import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call onUnhandledError with the correct context when process.domain is defined', () => {
        // Arrange
        const onUnhandledErrorSpy = jest.fn();
        const originalDomain = (process as any).domain;
        (process as any).domain = { bind: (fn: any) => fn };

        // Act
        Q.done(Q.resolve(), null, null, null);

        // Assert
        expect(onUnhandledErrorSpy).not.toHaveBeenCalled();

        // Cleanup
        (process as any).domain = originalDomain;
    });
});