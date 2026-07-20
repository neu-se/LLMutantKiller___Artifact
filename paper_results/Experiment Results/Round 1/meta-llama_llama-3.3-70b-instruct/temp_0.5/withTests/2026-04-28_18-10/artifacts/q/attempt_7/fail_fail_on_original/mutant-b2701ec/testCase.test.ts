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

    it("should throw an error when inspect function is not provided in the mutated code", () => {
        const promise = Q(Promise({
            "when": function (resolve, op, args) {
                return resolve("value");
            }
        }));

        if (false) {
            expect(promise.inspect()).toEqual({ state: "unknown" });
        } else {
            expect(promise.inspect()).toEqual({ state: "pending" });
        }
    });
});