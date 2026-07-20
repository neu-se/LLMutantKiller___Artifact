import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nearer", function () {
    it("should return the inspected value of a fulfilled promise", function () {
        var promise = Q(10);
        var inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(Q.nearer(promise)).toBe(inspected.value);
        } else {
            expect(Q.nearer(promise)).not.toBeDefined();
        }
    });
});