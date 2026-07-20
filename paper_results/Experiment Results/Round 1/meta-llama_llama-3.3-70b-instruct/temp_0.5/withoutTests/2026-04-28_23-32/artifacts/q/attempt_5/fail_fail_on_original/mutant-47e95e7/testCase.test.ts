import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return a promise that is fulfilled when the value is an object', (done) => {
        const promise = Q({ a: 5 });
        promise.then((value) => {
            expect(value).toEqual({ a: 5 });
            done();
        });
    });
});