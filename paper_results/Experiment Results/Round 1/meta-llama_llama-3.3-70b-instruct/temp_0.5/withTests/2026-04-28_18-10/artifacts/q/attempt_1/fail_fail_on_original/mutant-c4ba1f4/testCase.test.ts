import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", function () {
    it("should result in a fulfilled promise when given a value", function () {
        expect(Q(5).isFulfilled()).toBe(true);
    });
});