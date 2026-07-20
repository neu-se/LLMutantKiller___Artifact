import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q post method", () => {
    it("should call the post method with the provided name and arguments when name is not null or undefined", () => {
        const obj = {
            method: (a, b, c) => a + b + c,
        };

        return Q.post(obj, "method", [1, 2, 3]).then((result) => {
            expect(result).toBe(6);
        });
    });

    it("should not call the post method when name is null or undefined", () => {
        const obj = {
            method: (a, b, c) => a + b + c,
        };

        return Q.post(obj, null, [1, 2, 3]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error).toBeUndefined();
        });
    });
});