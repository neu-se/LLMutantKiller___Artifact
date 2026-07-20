import { Q } from "../../../q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.defer().promise;
        const error = new Error('Test error');
        Q.trackRejection(promise, error);
        expect(Q.getUnhandledReasons()).toEqual([error.stack]);
        Q.trackUnhandledRejections = false;
        Q.trackRejection(promise, error);
        expect(Q.getUnhandledReasons()).toEqual([error.stack]);
    });
});