import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when process.domain is not bound to onUnhandledError', () => {
        // Arrange
        const processDomain = jest.spyOn(process, 'domain', 'get');
        processDomain.mockReturnValue({ bind: jest.fn() });

        // Act and Assert
        expect(() => {
            Q.done(Q.resolve(), null, null, null);
        }).toThrowError('Q can\'t apply finally callback');

        // Cleanup
        processDomain.mockRestore();
    });
});