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

    it("should throw an error when the bound function is called without arguments", () => {
        const add = (a: number, b: number) => a + b;
        const boundAdd = Q.fbind(add, 1);
        expect(() => boundAdd()).toThrowError();
    });
});