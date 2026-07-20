import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("object_keys", () => {
    it("should return all own property names of an object", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const keys = Q.keys(obj);
        return keys.then((result: string[]) => {
            expect(result).toEqual(["a", "b", "c"]);
        });
    });

    it("should return an empty array for an empty object", () => {
        const obj = {};
        const keys = Q.keys(obj);
        return keys.then((result: string[]) => {
            expect(result).toEqual([]);
        });
    });

    it("should return keys in the correct order", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const keys = Q.keys(obj);
        return keys.then((result: string[]) => {
            expect(result).toEqual(["a", "b", "c"]);
            // This will fail in the mutated code because the order of keys is not guaranteed
            expect(result[0]).toBe("a");
        });
    });
});