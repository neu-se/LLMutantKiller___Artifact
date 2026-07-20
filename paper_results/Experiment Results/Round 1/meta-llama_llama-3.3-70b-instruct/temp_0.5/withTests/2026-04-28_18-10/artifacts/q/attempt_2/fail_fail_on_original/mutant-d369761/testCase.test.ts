import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("object_keys function", () => {
    it("should return the correct keys for an object", () => {
        const object = { a: 1, b: 2, c: 3 };
        const keys = Q.keys(object);
        return keys.then((result: string[]) => {
            expect(result).toEqual(["a", "b", "c"]);
        });
    });

    it("should return an empty array for an empty object", () => {
        const object = {};
        const keys = Q.keys(object);
        return keys.then((result: string[]) => {
            expect(result).toEqual([]);
        });
    });

    it("should handle objects with inherited properties", () => {
        const parent = { a: 1 };
        const child = Object.create(parent);
        child.b = 2;
        const keys = Q.keys(child);
        return keys.then((result: string[]) => {
            expect(result).toEqual(["b"]);
        });
    });
});