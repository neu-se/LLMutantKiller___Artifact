import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return the keys of an object", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).then((promise) => {
            expect(promise.keys).toBeDefined();
            return promise.keys();
        }).then((keys) => {
            expect(keys).toEqual(["a", "b"]);
        });
    });
});