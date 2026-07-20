import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should behave differently based on the inspect function", () => {
        const originalInspect = Q.inspect;
        Q.inspect = function () {
            return { state: "unknown" };
        };

        const promise = Q(Promise({
            "when": function (resolve, op, args) {
                return resolve("value");
            }
        }));

        expect(promise.inspect()).toEqual({ state: "unknown" });

        Q.inspect = originalInspect;
    });
});