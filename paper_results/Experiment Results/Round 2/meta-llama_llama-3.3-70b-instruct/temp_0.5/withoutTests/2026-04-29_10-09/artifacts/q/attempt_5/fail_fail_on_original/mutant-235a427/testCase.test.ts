import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise that resolves with the correct value when using Q.promised', () => {
        const add = Q.promised(function (a: number, b: number) {
            return a + b;
        });
        return expect(add(2, 3)).resolves.toBe(5);
    });
    it('should return a rejected promise when using Q.promised with an empty array', () => {
        const add = Q.promised(function (self: any, args: any[]) {
            return self + args[0] + args[1];
        });
        return expect(add([], 2, 3)).rejects.toThrow();
    });
});