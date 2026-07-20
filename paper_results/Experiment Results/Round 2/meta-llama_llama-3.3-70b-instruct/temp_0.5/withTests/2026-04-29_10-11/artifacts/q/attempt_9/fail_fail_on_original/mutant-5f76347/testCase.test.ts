import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).del("a").then(() => {
            expect(obj).toEqual({ b: 2 });
        });
    });

    it("should pass when key is provided in the original code", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).del("a").then(() => {
            expect(obj).toEqual({ b: 2 });
        });
    });

    it("should fail when key is not provided in the mutated code", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).del().then(() => {
            expect(true).toBe(false);
        }, (err: any) => {
            expect(err).not.toBeNull();
        });
    });
});