import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should return the keys of an object", () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).keys().then((keys) => {
            expect(keys).toEqual(["a", "b"]);
        });
    });
});