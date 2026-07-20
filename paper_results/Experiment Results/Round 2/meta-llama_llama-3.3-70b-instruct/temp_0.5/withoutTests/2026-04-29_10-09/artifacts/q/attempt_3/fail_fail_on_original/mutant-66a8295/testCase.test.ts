import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.defer().promise;
        const error = new Error('Test error');
        Q.trackRejection(promise, error);
        expect(Q.getUnhandledReasons()).toEqual([error.stack]);
    });
});