import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q library', () => {
    it('should track unhandled rejections', () => {
        const originalTrackUnhandledRejections = Q.trackUnhandledRejections;
        Q.trackUnhandledRejections = true;
        const promise = Q.reject('Test rejection');
        Q.trackRejection(promise, 'Test rejection');
        expect(Q.getUnhandledReasons()).toEqual(['(no stack) Test rejection']);
        Q.trackUnhandledRejections = originalTrackUnhandledRejections;
    });
});