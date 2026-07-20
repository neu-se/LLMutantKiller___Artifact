import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q post method", () => {
    it("should throw an error when name is null or undefined in the mutated code", () => {
        const obj = {
            method: (a: number, b: number, c: number) => a + b + c,
        };

        expect(() => Q.post(obj, null, [1, 2, 3])).toThrowError();
    });

    it.skip("should not throw an error when name is not null or undefined in the original code", () => {
        const obj = {
            method: (a: number, b: number, c: number) => a + b + c,
        };

        expect(() => Q.post(obj, "method", [1, 2, 3])).not.toThrowError();
    });
});