import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("object_keys", () => {
    it("should return all own property names of an object", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const keys = Q.keys(obj);
        return keys.then((result: string[]) => {
            expect(result).toEqual(["a", "b", "c"]);
            // Add a check to ensure the function is working correctly
            expect(result.length).toBe(3);
        });
    });
});