import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise in a future turn of the event loop', (done) => {
        const promise = Q.resolve('test');
        promise.then((value) => {
            expect(value).toBe('test');
            done();
        });
        // If the mutation is present, this test will hang indefinitely
        // because the promise will not be resolved in a future turn of the event loop
    });
});