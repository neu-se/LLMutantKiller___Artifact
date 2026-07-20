import { Q } from "../../../q.js";

describe('Q.race function', () => {
    it('should return a promise that resolves to the first resolved value', () => {
        const promise1 = new Promise((resolve) => {
            setTimeout(() => resolve('Promise 1'), 100);
        });
        const promise2 = new Promise((resolve) => {
            setTimeout(() => resolve('Promise 2'), 50);
        });

        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe('Promise 2');
        });
    });
});