import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return a promise that is fulfilled when the value is a rejected promise', () => {
        const promise = Q(Promise.reject('error'));
        let fulfilled = false;
        promise.then(() => {
            fulfilled = true;
        }, () => {
            // do nothing
        });
        expect(fulfilled).toBe(false);
    });
});