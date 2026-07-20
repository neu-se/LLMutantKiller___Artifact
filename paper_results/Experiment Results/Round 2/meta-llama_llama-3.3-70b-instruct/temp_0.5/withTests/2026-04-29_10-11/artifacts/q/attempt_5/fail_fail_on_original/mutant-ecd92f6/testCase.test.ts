describe("Promise", () => {
    it("should create a promise with a default inspect function when none is provided", () => {
        const Q = require("../../../../../../../../../../../subject_repositories/q/q");
        const promise = Q.Promise({}, function(op) {
            return Q.reject(new Error("Promise does not support operation: " + op));
        }, function() {
            return { state: "unknown" };
        });
        const inspect = promise.inspect();
        if (inspect === void 0) {
            throw new Error("inspect is undefined");
        }
        expect(inspect.state).toBe("unknown");
    });
});