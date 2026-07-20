import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call nodeify function with object and nodeback", () => {
        const object = "test object";
        const nodeback = jest.fn();
        const promise = Q(object);
        promise.nodeify(nodeback);
        expect(nodeback).toHaveBeenCalledTimes(1);
        expect(nodeback).toHaveBeenCalledWith(null, object);
    });
});