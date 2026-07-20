const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise exception handling", () => {
    it("should reject when an exception occurs in promise dispatch", async () => {
        const promise = Q.Promise(function (resolve: any, reject: any) {
            resolve(Q({
                "when": function () {
                    throw new Error("Test exception");
                }
            }));
        });

        await expect(promise).rejects.toThrow("Test exception");
    });
});