import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should inspect a promise with an undefined inspect function", () => {
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
            return { state: "unknown" };
        }));

        expect(promise.inspect()).toEqual({ state: "unknown" });
    });

    it("should throw an error when inspect function is undefined", () => {
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
        }, void 0, undefined));

        expect(() => promise.inspect()).toThrowError();
    });
});