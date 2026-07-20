import { Promise } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should return an object with a state when inspect is called", () => {
        const promise = Promise({
            "when": function () {},
            "get": function () {},
            "set": function () {},
            "delete": function () {},
            "post": function () {},
            "apply": function () {},
            "keys": function () {}
        }, function (op, args) {
            if (op === "when") {
                return { state: "unknown" };
            }
        }, function () {
            return { state: "unknown" };
        });
        expect(promise.inspect().state).toBe("unknown");
    });
});