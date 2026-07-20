import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should dispatch 'apply' when calling fcall", () => {
        const object = {
            apply: jest.fn(),
        };
        const promise = Q(object);
        promise.fcall("test");
        expect(object.apply).toHaveBeenCalledTimes(1);
        expect(object.apply).toHaveBeenCalledWith(void 0, ["test"]);
    });
});