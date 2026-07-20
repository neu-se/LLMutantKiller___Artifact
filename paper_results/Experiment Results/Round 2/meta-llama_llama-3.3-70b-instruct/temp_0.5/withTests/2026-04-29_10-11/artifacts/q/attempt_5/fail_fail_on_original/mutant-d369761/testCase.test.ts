import { Q } from "../../../q.js";

describe("object_keys", () => {
    it("should return all own property names of an object", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const keys = Q.keys(obj);
        return keys.then((result) => {
            expect(result).toEqual(["a", "b", "c"]);
        });
    });

    it("should return an empty array for an empty object", () => {
        const obj = {};
        const keys = Q.keys(obj);
        return keys.then((result) => {
            expect(result).toEqual([]);
        });
    });

    it("should throw an error when object has no own properties", () => {
        const obj = Object.create(null);
        const keys = Q.keys(obj);
        return keys.then((result) => {
            expect.fail("Expected error to be thrown");
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});