import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise that resolves with the correct value when using Q.promised', () => {
        const add = Q.promised(function (a: number, b: number) {
            return a + b;
        });
        return expect(add(2, 3)).resolves.toBe(5);
    });
});