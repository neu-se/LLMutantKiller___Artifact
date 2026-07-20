import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should inspect a promise with a defined inspect function", () => {
        const promise = Q(Promise({
            "when": function (resolve, op, args) {
                return resolve("value");
            },
            "get": function (name) {
                return "value";
            },
            "set": function (name, rhs) {
                return rhs;
            },
            "delete": function (name) {
                return true;
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

        expect(promise.inspect()).toEqual({ state: "fulfilled", value: "value" });
    });
});