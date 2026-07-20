import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call Q.done without throwing an error when process.domain is defined', () => {
        // Arrange
        const promise = Q.resolve('test');
        const originalDomain = (process as any).domain;

        // Act and Assert
        expect(() => {
            Q.done(promise, () => {}, () => {}, () => {});
        }).not.toThrow();

        // Cleanup
        (process as any).domain = originalDomain;
    });
});