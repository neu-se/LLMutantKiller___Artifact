import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return undefined when nodeback is provided and no return statement", () => {
        const promise = Q(Promise.resolve());
        const nodeback = jest.fn();
        const result = promise.nodeify(nodeback);
        expect(result).toBeUndefined();
    });
});