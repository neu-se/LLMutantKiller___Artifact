import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q post method", () => {
    it.skip("should call the post method with the provided name and arguments", () => {
        const obj = {
            method: (a: number, b: number, c: number) => a + b + c,
        };

        return Q(obj).post("method", [1, 2, 3]).then((result: number) => {
            expect(result).toBe(6);
        });
    });

    it("should throw an error when name is null or undefined in the mutated code", () => {
        const obj = {
            method: (a: number, b: number, c: number) => a + b + c,
        };

        expect(() => Q(obj).post(null, [1, 2, 3])).toThrowError();
    });
});