import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify function", () => {
    it("should throw an error when the nodeify function is empty", () => {
        var promise = Q(10);
        expect(promise.nodeify).not.toBeInstanceOf(Function);
    });
});