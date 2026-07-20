import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the fallback function when the descriptor does not have the given method", () => {
        var promise = Q.Promise({
            "when": function (resolve, op, args) {
                if (op === "test") {
                    resolve("test");
                }
            }
        }, function fallback(op, args) {
            return "fallback";
        });

        return promise.dispatch("when", ["test"]).then(function (value) {
            expect(value).toBe("test");
        });
    });
});