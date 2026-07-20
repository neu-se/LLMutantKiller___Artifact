import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of Q.keys", () => {
        var obj = { a: 1, b: 2 };
        var promise = Q(obj);
        expect(typeof promise.keys).toBe('function');
        return promise.keys().then(function(keys) {
            expect(keys.sort()).toEqual(["a", "b"]);
        });
    });
});