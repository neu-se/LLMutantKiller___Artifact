import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call onUnhandledError with the correct context when process.domain is defined', () => {
        // Arrange
        const onUnhandledErrorSpy = jest.fn();
        const processDomain = { bind: (fn) => fn };
        jest.spyOn(process, 'domain', 'get').mockReturnValue(processDomain);

        // Act
        Q.done(Q.resolve(), null, null, null, onUnhandledErrorSpy);

        // Assert
        expect(onUnhandledErrorSpy).toHaveBeenCalledTimes(1);

        // Cleanup
        jest.restoreAllMocks();
    });
});