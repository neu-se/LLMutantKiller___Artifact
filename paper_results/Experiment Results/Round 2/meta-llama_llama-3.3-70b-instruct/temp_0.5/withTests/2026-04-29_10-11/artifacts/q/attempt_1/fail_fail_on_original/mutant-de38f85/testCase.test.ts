import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should return the keys of an object", () => {
        var obj = { a: 1, b: 2 };
        return Q(obj).keys().then(function(keys) {
            expect(keys.sort()).toEqual(["a", "b"]);
        });
    });
});