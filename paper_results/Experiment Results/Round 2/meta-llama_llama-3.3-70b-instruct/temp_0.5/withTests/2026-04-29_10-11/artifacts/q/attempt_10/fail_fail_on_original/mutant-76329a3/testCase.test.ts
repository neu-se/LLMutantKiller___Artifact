import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
    it("should return a function that calls the original function with the given arguments", () => {
        const add = (a: number, b: number) => a + b;
        const boundAdd = Q.fbind(add, 1);
        const result = boundAdd(2);
        return result.then((res: number) => {
            expect(res).toBe(3);
        });
    });

    it("should return a function that calls the original function with the correct this context", () => {
        const add = function(a: number, b: number) {
            return this.value + a + b;
        };
        const obj = { value: 1 };
        const boundAdd = Q.fbind(add, 1).bind(obj);
        const result = boundAdd(2);
        return result.then((res: number) => {
            expect(res).toBe(4);
        });
    });
});