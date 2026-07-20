import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise in a future turn of the event loop', (done) => {
        const promise = Q('test');
        promise.then((value) => {
            expect(value).toBe('test');
            done();
        });
    });
});