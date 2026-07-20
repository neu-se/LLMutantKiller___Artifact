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

    it("should not create a promise with inspect function when condition is false", () => {
        const promise = Q(Promise({
            "when": function (resolve, op, args) {
                return resolve("value");
            }
        }, function () {
            return this;
        }, function () {
            return { state: "unknown" };
        }));

        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});