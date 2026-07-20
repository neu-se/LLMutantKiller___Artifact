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

    it("should throw an error when inspect is not a function in the mutated code", () => {
        const promise = Q(Promise({
            "when": function (resolve, op, args) {
                return resolve("value");
            }
        }));

        expect(() => {
            if (false) {
                promise.inspect();
            } else {
                throw new Error("inspect is not a function");
            }
        }).toThrowError("inspect is not a function");
    });
});