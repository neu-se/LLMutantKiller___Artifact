import { Q } from "../../../../../q";

describe("object_keys function", () => {
    it("should return the correct keys for an object", () => {
        const object = { a: 1, b: 2, c: 3 };
        const keys = Q.keys(object);
        return keys.then((result: string[]) => {
            expect(result).toContain("a");
            expect(result).toContain("b");
            expect(result).toContain("c");
        });
    });
});