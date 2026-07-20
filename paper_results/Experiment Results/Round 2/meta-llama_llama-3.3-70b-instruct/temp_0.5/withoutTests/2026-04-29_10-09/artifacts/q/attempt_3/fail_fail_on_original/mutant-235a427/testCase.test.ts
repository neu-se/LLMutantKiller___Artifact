import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise that resolves with the correct value when using Q.promised', () => {
        const callback = Q.promised(function (self: any, args: any[]) {
            return self + args[0] + args[1];
        });
        return expect(callback(2, 3, 4)).resolves.toBe(9);
    });
});