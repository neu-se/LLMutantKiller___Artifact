import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should correctly handle the valueOf method", () => {
        const promise = Q(Promise({
            "when": function (fulfilled) {
                return fulfilled("value");
            }
        }));

        expect(promise.valueOf()).toBe(promise);
    });
});