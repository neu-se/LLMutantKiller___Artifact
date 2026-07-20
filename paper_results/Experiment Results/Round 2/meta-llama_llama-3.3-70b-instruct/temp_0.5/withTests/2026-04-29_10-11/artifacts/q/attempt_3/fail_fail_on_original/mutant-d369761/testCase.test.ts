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

    it("should return an array of property names for an object with inherited properties", () => {
        const parent = { a: 1, b: 2 };
        const child = Object.create(parent);
        child.c = 3;
        const keys = Q.keys(child);
        return keys.then((result: string[]) => {
            expect(result).toEqual(["c"]);
        });
    });
});