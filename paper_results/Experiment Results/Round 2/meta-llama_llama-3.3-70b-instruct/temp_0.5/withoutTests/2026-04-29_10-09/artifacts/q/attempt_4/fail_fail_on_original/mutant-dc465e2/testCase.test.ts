import { Q } from "../../../q.js";

describe('Q', () => {
    it('should clear the timeout when the promise is resolved', (done) => {
        const promise = Q.timeout(Q.resolve('test'), 100);
        jest.useFakeTimers();
        promise.then((value) => {
            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(clearTimeout).toHaveBeenCalledTimes(1);
            done();
        });
        jest.runAllTimers();
    });
});