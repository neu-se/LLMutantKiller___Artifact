import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify function", () => {
    it("should throw an error when nodeify is called without a callback", () => {
        var promise = Q(10);
        expect(() => promise.nodeify()).toThrowError("Q.noConflict only works when Q is used as a global");
    });
});