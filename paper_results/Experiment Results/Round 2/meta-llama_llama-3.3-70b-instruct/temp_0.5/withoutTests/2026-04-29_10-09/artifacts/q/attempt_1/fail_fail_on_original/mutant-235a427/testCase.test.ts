import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise that resolves with the correct value when using Q.promised', () => {
        const add = Q.promised(function (a, b) {
            return a + b;
        });
        return add(2, 3).then(result => {
            expect(result).toBe(5);
        });
    });
});