import { Q } from "./q.js";

describe("Q.keys", () => {
    it("should return a promise when Q(object).keys() is called", () => {
        const object = { a: 1, b: 2, c: 3 };
        expect(Q(object).keys()).toBeInstanceOf(Promise);
    });
});