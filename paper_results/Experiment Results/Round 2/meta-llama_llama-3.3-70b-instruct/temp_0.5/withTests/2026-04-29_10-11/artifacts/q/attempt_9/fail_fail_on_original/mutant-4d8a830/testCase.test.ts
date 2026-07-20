import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q post method", () => {
    it("should call the post method with the provided name and arguments when name is not null or undefined", () => {
        const obj = {
            method: (a: number, b: number, c: number) => a + b + c,
        };

        return Q.post(obj, "method", [1, 2, 3]).then((result: number) => {
            expect(result).toBe(6);
        });
    });

    it("should not call the post method when name is null or undefined in the original code", () => {
        const obj = {
            method: (a: number, b: number, c: number) => a + b + c,
        };

        return Q.post(obj, null, [1, 2, 3]).then((result: number) => {
            expect(result).toBeUndefined();
        });
    });
});