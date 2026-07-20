import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.post", () => {
    it("should call the function with the given arguments when name is null or undefined", () => {
        const obj = {
            foo: function(arg1, arg2) {
                return arg1 + arg2;
            }
        };

        const result = Q(obj).post(null, [1, 2]);
        expect(result).resolves.toBe(3);

        const result2 = Q(obj).post(void 0, [1, 2]);
        expect(result2).resolves.toBe(3);
    });
});