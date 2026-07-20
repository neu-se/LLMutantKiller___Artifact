import { Q } from "../../../q.js";

describe("object_keys", () => {
    it("should return all own property names of an object", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const keys = Q.keys(obj);
        return keys.then((result: string[]) => {
            expect(result.length).toBe(3);
            expect(result.includes("a")).toBe(true);
            expect(result.includes("b")).toBe(true);
            expect(result.includes("c")).toBe(true);
        });
    });

    it("should return an empty array for an empty object", () => {
        const obj = {};
        const keys = Q.keys(obj);
        return keys.then((result: string[]) => {
            expect(result.length).toBe(0);
        });
    });
});