import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify function", () => {
    it("should throw an error when nodeify is called with no arguments and the function is empty", () => {
        var promise = Q(10);
        promise.nodeify = function () {};
        expect(() => promise.nodeify()).toThrowError();
    });
});