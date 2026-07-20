import { Q } from "../../../../../q.js";

describe("Q.post", () => {
    it("should not throw an error when name is null or undefined in the original code", () => {
        const obj = function(arg1: number, arg2: number) {
            return arg1 + arg2;
        };

        const result = Q(obj).post(null, [1, 2]);

        expect(result).resolves.toBe(3);
    });
});