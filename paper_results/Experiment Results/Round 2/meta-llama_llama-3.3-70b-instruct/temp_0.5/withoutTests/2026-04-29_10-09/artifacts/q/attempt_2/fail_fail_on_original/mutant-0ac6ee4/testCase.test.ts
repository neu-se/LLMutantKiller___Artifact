import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error with a correct message when a promise times out', () => {
        const promise = Q.timeout(Q.resolve(), 10);
        const errorSpy = jest.fn();
        promise.catch(errorSpy);
        jest.runOnlyPendingTimers();
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy.mock.calls[0][0].message).toBe('Timed out after 10 ms');
    });
});