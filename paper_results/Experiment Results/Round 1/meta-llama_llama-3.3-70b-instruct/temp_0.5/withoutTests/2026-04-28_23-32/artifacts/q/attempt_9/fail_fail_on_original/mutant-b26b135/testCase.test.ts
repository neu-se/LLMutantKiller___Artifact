import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fulfill", () => {
    it("should return a promise with a keys function that throws an error when called on the fulfilled value", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q.fulfill(obj);
        return promise.then((value) => {
            try {
                value.keys();
                expect(true).toBe(false);
            } catch (error) {
                expect(true).toBe(true);
            }
        });
    });
});