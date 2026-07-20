import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should correctly handle the inspect method", () => {
        const promise = Q(Promise({
            "when": function () {
                return "value";
            },
            "get": function (name) {
                return this[name];
            },
            "set": function (name, rhs) {
                this[name] = rhs;
            },
            "delete": function (name) {
                delete this[name];
            },
            "post": function (name, args) {
                return this[name].apply(this, args);
            },
            "apply": function (thisp, args) {
                return this.apply(thisp, args);
            },
            "keys": function () {
                return Object.keys(this);
            }
        }, void 0, function inspect() {
            return { state: "fulfilled", value: "value" };
        }));

        expect(promise.valueOf()).toBe("value");
    });
});