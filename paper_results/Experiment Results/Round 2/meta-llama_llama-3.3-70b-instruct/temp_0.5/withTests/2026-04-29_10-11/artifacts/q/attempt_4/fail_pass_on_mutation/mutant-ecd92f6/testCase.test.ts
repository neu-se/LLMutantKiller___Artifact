describe("Promise", () => {
    it("should create a promise with a default inspect function when none is provided", () => {
        const Q = require("../../../../../../../../../../../subject_repositories/q/q");
        const promise = new Q.Promise(function(resolve, reject) {
            resolve();
        });
        expect(promise.inspect().state).toBe("fulfilled");
    });
});