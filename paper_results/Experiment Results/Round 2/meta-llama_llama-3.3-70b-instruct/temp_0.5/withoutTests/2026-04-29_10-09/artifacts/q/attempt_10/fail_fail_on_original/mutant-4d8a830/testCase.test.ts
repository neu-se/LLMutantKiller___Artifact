import { Q } from "../../../../../q.js";

describe("Q.post", () => {
    it("should behave as expected", () => {
        const obj = function(arg1: number, arg2: number) {
            return arg1 + arg2;
        };

        const result1 = Q(obj).post(null, [1, 2]);
        const result2 = Q(obj).post("foo", [1, 2]);

        expect(result1).resolves.toBe(3);
        expect(result2).rejects.toThrow();
    });
});