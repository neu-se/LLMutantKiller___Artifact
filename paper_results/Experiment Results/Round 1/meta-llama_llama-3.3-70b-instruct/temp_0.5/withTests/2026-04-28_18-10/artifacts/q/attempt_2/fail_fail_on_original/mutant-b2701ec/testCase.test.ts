import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should behave differently based on the inspect function", () => {
        const promise = Q(Promise({
            "when": function (resolve, op, args) {
                return resolve("value");
            },
            "inspect": function () {
                return { state: "unknown" };
            }
        }));

        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});