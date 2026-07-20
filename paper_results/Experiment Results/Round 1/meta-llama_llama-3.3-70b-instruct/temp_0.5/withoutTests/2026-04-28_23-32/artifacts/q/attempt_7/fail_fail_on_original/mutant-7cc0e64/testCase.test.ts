import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when process.domain is undefined', () => {
        // Arrange
        const originalDomain = (process as any).domain;
        (process as any).domain = undefined;

        // Act and Assert
        expect(() => {
            Q.done(Q.resolve(), () => {}, () => {}, () => {});
        }).not.toThrow();

        // Cleanup
        (process as any).domain = originalDomain;
    });
});