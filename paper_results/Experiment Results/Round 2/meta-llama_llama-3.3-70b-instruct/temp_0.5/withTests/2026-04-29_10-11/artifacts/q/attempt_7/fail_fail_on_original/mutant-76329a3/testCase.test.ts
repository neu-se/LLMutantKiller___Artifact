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

    it("should call the original function with the correct arguments", () => {
        const add = jest.fn((a: number, b: number) => a + b);
        const boundAdd = Q.fbind(add, 1);
        const result = boundAdd(2);
        return result.then(() => {
            expect(add).toHaveBeenCalledTimes(1);
            expect(add).toHaveBeenCalledWith(1, 2);
        });
    });
});