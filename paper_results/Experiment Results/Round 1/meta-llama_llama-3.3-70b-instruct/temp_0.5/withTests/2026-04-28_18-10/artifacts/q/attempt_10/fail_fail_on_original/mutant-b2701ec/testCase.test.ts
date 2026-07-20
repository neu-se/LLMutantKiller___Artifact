import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor behavior", () => {
    it("should create a promise with inspect function", () => {
        const promise = Q(Promise({
            "when": function (resolve, op, args) {
                return resolve("value");
            },
            "inspect": function () {
                return { state: "fulfilled", value: "value" };
            }
        }));

        expect(promise.inspect()).toEqual({ state: "fulfilled", value: "value" });
    });

    it("should not throw an error when inspect is a function in the original code", () => {
        const promise = Q(Promise({
            "when": function (resolve, op, args) {
                return resolve("value");
            },
            "inspect": function () {
                return { state: "fulfilled", value: "value" };
            }
        }));

        expect(() => promise.inspect()).not.toThrow();
    });
});