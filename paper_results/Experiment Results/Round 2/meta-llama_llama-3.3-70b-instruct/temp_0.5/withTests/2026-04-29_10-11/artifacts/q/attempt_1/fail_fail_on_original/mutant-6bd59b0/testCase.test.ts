import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the get method", () => {
        var object = { a: 1 };
        var promise = Q(object).get("a");
        return promise.then(function (value) {
            expect(value).toBe(1);
        });
    });
});