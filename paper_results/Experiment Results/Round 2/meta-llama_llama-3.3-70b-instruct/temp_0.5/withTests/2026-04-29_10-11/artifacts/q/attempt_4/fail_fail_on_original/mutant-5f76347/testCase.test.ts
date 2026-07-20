import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).del("a", "b").then(() => {
            expect(obj).toEqual({ });
        });
    });

    it("should return undefined when deleting a property", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).del("a").then((result: any) => {
            expect(result).toBeUndefined();
        });
    });

    it("should propagate a rejection if the object is rejected", () => {
        const error = new Error("Test error");
        return Q.reject(error).del("a").then(() => {
            expect(true).toBe(false);
        }, (err: any) => {
            expect(err).toBe(error);
        });
    });
});