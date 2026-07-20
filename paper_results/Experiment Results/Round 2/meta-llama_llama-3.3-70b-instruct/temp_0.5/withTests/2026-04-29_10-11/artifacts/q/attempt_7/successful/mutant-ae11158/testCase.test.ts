import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply function", () => {
    it("should call the provided function with the given arguments", () => {
        const callback = jest.fn();
        q.nfapply(function (a, b, c, callback) {
            callback(null, a + b + c);
        }, [1, 2, 3]).then((result) => {
            expect(result).toBe(6);
        });
    });
});