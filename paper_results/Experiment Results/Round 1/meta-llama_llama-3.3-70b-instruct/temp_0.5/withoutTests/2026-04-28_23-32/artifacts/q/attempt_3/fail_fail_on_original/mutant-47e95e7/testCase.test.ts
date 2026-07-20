import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return a promise that is pending when the value is a promise', (done) => {
        const promise = Q(new Promise((resolve) => {
            setTimeout(() => {
                resolve(5);
            }, 100);
        }));
        promise.then((value) => {
            expect(value).toBe(5);
            done();
        });
    });
});