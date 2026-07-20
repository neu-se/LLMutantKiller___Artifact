import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with unknown state when inspect is undefined", () => {
        const promise = Q(Promise({
            "when": function () {
                return "value";
            },
            "get": function (name) {
                return "value";
            },
            "set": function (name, rhs) {
                return "value";
            },
            "delete": function (name) {
                return "value";
            },
            "post": function (name, args) {
                return "value";
            },
            "apply": function (thisp, args) {
                return "value";
            },
            "keys": function () {
                return ["key"];
            }
        }, void 0));
        
        const inspect = promise.inspect();
        expect(inspect.state).toBe("unknown");
    });
});