import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly build a long stack trace", () => {
        var error = new Error("Test error");
        var promise = Q();
        promise.stackCounter = 1;
        var p = promise;
        for (var i = 0; i < 10; i++) {
            p = Q(p);
        }
        makeStackTraceLong(error, promise);
        expect(error.stack).toContain("makeStackTraceLong");
    });
});