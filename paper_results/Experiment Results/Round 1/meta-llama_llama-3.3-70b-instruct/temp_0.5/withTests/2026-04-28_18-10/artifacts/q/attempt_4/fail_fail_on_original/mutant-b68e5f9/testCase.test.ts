import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when nodeback is provided and no return statement in the mutated code", () => {
        const promise = q(Promise.resolve());
        const nodeback = jest.fn();
        expect(() => promise.nodeify(nodeback)).toThrowError();
    });
});