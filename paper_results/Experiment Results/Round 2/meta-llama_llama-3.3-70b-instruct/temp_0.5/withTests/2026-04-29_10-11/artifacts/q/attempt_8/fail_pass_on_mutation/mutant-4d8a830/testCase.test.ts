import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q post method", () => {
    it.skip("should call the post method with the provided name and arguments", () => {
        const obj = {
            method: (a: number, b: number, c: number) => a + b + c,
        };

        return Q.post(obj, "method", [1, 2, 3]).then((result: number) => {
            expect(result).toBe(6);
        });
    });

    it("should throw an error when the method does not exist", () => {
        const obj = {};

        expect(() => Q.post(obj, "method", [1, 2, 3])).toThrowError();
    });
});