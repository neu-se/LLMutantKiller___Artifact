import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).del("a").then(() => {
            expect(obj).toEqual({ b: 2 });
        });
    });

    it("should delete a property from an object with correct key", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).del("a").then(() => {
            expect(obj).toEqual({ b: 2 });
        });
    });

    it("should throw an error when deleting a property with incorrect key in the mutated code", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).del().then(() => {
            expect(true).toBe(false);
        }, (err: any) => {
            expect(err).not.toBeNull();
        });
    });
});