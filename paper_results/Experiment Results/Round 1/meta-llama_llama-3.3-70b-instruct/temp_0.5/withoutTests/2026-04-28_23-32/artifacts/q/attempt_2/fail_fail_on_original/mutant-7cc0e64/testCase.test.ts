import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call process.domain.bind when process.domain is defined', () => {
        // Arrange
        const processDomainBindSpy = jest.fn();
        const processDomain = { bind: processDomainBindSpy };
        jest.spyOn(process, 'domain', 'get').mockReturnValue(processDomain);

        // Act
        Q.done(Q.resolve(), null, null, null);

        // Assert
        expect(processDomainBindSpy).toHaveBeenCalledTimes(1);

        // Cleanup
        jest.restoreAllMocks();
    });
});