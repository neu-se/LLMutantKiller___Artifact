import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return undefined when calling done on a promise", () => {
        var promise = Q();
        var returnValue = promise.done(function () { }, function () { });
        expect(returnValue).toBe(undefined);
    });
});