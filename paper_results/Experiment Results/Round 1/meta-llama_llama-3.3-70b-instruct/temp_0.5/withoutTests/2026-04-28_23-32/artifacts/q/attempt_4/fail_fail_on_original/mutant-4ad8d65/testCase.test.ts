import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should dispatch 'apply' when calling fcall", () => {
        const object = {
            dispatch: jest.fn((op, args) => {
                if (op === "apply") {
                    return Q.resolve();
                } else {
                    throw new Error("Invalid operation");
                }
            }),
        };
        const promise = Q(object);
        promise.fcall("test");
        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith("apply", [void 0, ["test"]]);
    });
});