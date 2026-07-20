import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should dispatch 'apply' when calling fcall", () => {
        const object = {
            apply: jest.fn(),
            dispatch: jest.fn(() => Q.resolve()),
        };
        const promise = Q(object);
        promise.fcall("test");
        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith("apply", [void 0, ["test"]]);
    });
});