describe("Promise", () => {
    it("should create a promise with a default inspect function when none is provided", () => {
        const Q = require("../../../../../../../../../../../subject_repositories/q/q");
        const promise = Q.Promise({
            "when": function (resolve, op, args) {
                resolve();
            }
        }, function fallback(op, args) {
            return Q.reject(new Error("Promise does not support operation: " + op));
        }, function inspect() {
            return { state: "unknown" };
        });
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});