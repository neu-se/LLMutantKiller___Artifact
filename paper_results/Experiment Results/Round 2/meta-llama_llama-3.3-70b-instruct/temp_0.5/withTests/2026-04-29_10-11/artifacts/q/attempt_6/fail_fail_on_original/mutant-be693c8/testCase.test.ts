import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject with a timeout error if the promise is too slow and the timeoutId is set', () => {
        var timeoutId: any;
        var originalSetTimeout = setTimeout;
        var setTimeoutSpy = jest.fn(function (fn, ms) {
            timeoutId = originalSetTimeout(fn, ms);
        });
        jest.spyOn(global, 'setTimeout').mockImplementation(setTimeoutSpy);

        var promise = Q.timeout(Q.delay(100), 10);

        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(timeoutId).not.toBeNull();
                expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
            }
        );
    });
});