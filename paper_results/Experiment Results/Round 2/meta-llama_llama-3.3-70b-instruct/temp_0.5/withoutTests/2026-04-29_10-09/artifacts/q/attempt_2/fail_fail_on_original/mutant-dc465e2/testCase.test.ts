import { Q } from "../../../q";

describe('Q', () => {
    it('should clear the timeout when the promise is resolved', (done) => {
        const promise = Q.timeout(Q.resolve('test'), 100);
        let timeoutId: NodeJS.Timeout;
        jest.spyOn(global, 'setTimeout').mockImplementation((fn, delay) => {
            timeoutId = setTimeout(fn, delay);
            return timeoutId;
        });
        promise.then((value) => {
            expect(clearTimeout).toHaveBeenCalledTimes(1);
            expect(clearTimeout).toHaveBeenCalledWith(timeoutId);
            done();
        });
    });
});