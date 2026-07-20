import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys", () => {
    it("should return a promise that resolves with the keys of the given object", () => {
        const object = { a: 1, b: 2, c: 3 };
        return Q(object).then((resolvedObject) => {
            return resolvedObject.keys().then((keys) => {
                expect(keys).toEqual(["a", "b", "c"]);
            });
        });
    });
});