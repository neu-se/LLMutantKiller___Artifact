import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.post", () => {
    it("should behave differently when name is null or undefined", () => {
        const obj = function(arg1, arg2) {
            return arg1 + arg2;
        };

        const result1 = Q(obj).post(null, [1, 2]);
        const result2 = Q(obj).post("foo", [1, 2]);

        expect(result1).resolves.toBe(3);
        expect(result2).rejects.toThrow();
    });
});