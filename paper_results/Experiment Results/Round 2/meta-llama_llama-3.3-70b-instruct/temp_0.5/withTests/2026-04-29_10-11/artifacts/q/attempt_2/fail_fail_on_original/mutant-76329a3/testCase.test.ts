import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
    it("should return a function that calls the original function with the given arguments", () => {
        const add = (a: number, b: number) => a + b;
        const boundAdd = Q.fbind(add);
        return boundAdd(1, 2).then((result: number) => {
            expect(result).toBe(3);
        });
    });

    it("should throw an error when called without arguments", () => {
        const add = (a: number, b: number) => a + b;
        const boundAdd = Q.fbind(add);
        expect(() => boundAdd()).toThrowError();
    });
});