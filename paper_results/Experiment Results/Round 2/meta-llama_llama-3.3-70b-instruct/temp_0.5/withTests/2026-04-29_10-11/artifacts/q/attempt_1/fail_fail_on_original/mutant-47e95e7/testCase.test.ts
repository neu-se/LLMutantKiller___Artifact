import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should handle inspected state correctly', () => {
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
        }, void 0, function inspect() {
            return { state: "fulfilled", value: "value" };
        }));

        expect(promise.valueOf()).toBe("value");
    });
});