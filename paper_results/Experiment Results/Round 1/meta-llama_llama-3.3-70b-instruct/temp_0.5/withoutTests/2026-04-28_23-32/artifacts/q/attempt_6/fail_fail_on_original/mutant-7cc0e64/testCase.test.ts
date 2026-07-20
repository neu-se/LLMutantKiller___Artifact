import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call process.domain.bind when process.domain is defined', () => {
        // Arrange
        const bindSpy = jest.fn();
        (global as any).process = {
            domain: {
                bind: bindSpy,
            },
        };

        // Act
        Q.done(Q.resolve(), () => {}, () => {}, () => {});

        // Assert
        expect(bindSpy).toHaveBeenCalledTimes(1);

        // Cleanup
        (global as any).process = undefined;
    });
});