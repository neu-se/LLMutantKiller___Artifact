import { Q } from "../q";

describe('Q', () => {
    it('should reject with a timeout error if the promise is too slow and the timeout function is called', () => {
        var timeoutId: any;
        var timeoutSpy = jest.fn(function () {
            timeoutId = setTimeout(function () {}, 10);
        });
        jest.spyOn(global, 'setTimeout').mockImplementation(timeoutSpy);

        var promise = Q.timeout(Q.delay(100), 10);

        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error.code).toBe('ETIMEDOUT');
                expect(timeoutSpy).toHaveBeenCalledTimes(1);
            }
        );
    });
});