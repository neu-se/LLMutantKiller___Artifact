import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with inspect function", () => {
        const promise = Q(Promise({
            "when": function () {
                return "test";
            }
        }, function fallback() {
            return this;
        }, function inspect() {
            return { state: "pending" };
        }));

        expect(promise.inspect()).toBeDefined();
    });
});