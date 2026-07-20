import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not call the post method with null or undefined name", () => {
        const obj = {
            post: jest.fn(),
        };

        const promise = Q(obj);
        promise.dispatch("post", [null, []]);
        promise.dispatch("post", [void 0, []]);

        expect(obj.post).not.toHaveBeenCalled();
    });

    it("should call the post method with a valid name", () => {
        const obj = {
            post: jest.fn(),
        };

        const promise = Q(obj);
        promise.dispatch("post", ["test", []]);

        expect(obj.post).toHaveBeenCalledTimes(1);
    });
});