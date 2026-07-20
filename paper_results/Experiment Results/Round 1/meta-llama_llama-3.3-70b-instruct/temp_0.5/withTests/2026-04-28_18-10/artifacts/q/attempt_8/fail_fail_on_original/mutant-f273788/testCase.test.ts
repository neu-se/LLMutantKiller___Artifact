import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fapply", () => {
    it("should apply a function with the given arguments", () => {
        const func = (a: number, b: number, c: number) => a + b + c;
        const promise = Q(func);
        return promise.fapply([1, 2, 3]).then((result: any) => {
            expect(result).toBe(6);
        });
    });

    it("should pass arguments to the function", () => {
        const func = (a: number, b: number, c: number) => [a, b, c];
        const promise = Q(func);
        return promise.fapply([1, 2, 3]).then((result: any) => {
            expect(result).toEqual([1, 2, 3]);
        });
    });

    it("should throw an error when the function is called with no arguments in the mutated code", () => {
        const func = (a: number, b: number, c: number) => a + b + c;
        const promise = Q(func);
        return promise.fapply([]).then((result: any) => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(error).not.toBeUndefined();
        });
    });
});