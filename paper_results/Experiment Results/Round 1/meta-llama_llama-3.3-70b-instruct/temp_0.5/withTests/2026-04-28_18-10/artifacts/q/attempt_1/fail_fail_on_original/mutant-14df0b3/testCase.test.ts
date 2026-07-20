import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj).delete("a");
        return promise.then((result) => {
            expect(obj).toEqual({ b: 2 });
            expect(result).toBeUndefined();
        });
    });

    it("should propagate a rejection", () => {
        const error = new Error("Gah!");
        const promise = Q.reject(error).delete("a");
        return promise.then(() => {
            expect(true).toBe(false);
        }, (exception) => {
            expect(exception).toBe(error);
        });
    });
});