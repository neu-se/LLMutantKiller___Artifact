import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.post", () => {
    it("should throw an error when name is null or undefined in the mutated code", () => {
        const obj = function(arg1: number, arg2: number) {
            return arg1 + arg2;
        };

        const result = Q(obj).post(null, [1, 2]);

        expect(result).rejects.toThrow();
    });
});