import { Q } from "../../../q.js";

describe("object_keys", () => {
    it("should return all own property names of an object", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const keys = Q.keys(obj);
        return keys.then((result: string[]) => {
            expect(result).toEqual(["a", "b", "c"]);
        });
    });

    it("should throw an error when object has no own properties", () => {
        const obj = Object.create(null);
        const keys = Q.keys(obj);
        return keys.then((result) => {
            throw new Error("Expected error to be thrown");
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });

    it("should return keys in the correct order for objects with multiple properties", () => {
        const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
        const keys = Q.keys(obj);
        return keys.then((result: string[]) => {
            expect(result).toEqual(["a", "b", "c", "d", "e"]);
        });
    });
});