import { Q } from "./q.js";

describe("Q.keys", () => {
    it("should not throw an error when Q.keys is called on an object", () => {
        const object = { a: 1, b: 2, c: 3 };
        expect(() => Q.keys(object)).not.toThrowError();
    });
});