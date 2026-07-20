import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should clear the timeout when the promise is resolved', (done) => {
        const promise = Q.timeout(Q.resolve('test'), 100, 'Timeout error');
        let timeoutId: any;
        jest.spyOn(global, 'setTimeout').mockImplementation((fn, delay) => {
            timeoutId = setTimeout(fn, delay);
            return timeoutId;
        });
        jest.spyOn(global, 'clearTimeout').mockImplementation((id: any) => {
            if (id === timeoutId) {
                throw new Error('Timeout was cleared');
            }
        });
        promise.then(() => {
            expect(clearTimeout).toHaveBeenCalledTimes(1);
            done();
        });
    });
});