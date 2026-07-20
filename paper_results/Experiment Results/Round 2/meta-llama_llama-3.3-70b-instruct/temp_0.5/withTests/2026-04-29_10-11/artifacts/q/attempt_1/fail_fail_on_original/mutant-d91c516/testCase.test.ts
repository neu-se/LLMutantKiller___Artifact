import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys", () => {
    it("should return a promise that resolves with the keys of the given object", () => {
        const object = { a: 1, b: 2, c: 3 };
        return Q.keys(object).then((keys) => {
            expect(keys).toEqual(["a", "b", "c"]);
        });
    });
});