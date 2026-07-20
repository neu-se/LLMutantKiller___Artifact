import { Q } from "../../../q.js";

describe("Q", () => {
    it("should call the post method with a valid name but not with null or undefined", () => {
        const obj = {
            post: jest.fn(),
        };

        const promise = Q(obj);
        promise.dispatch("post", ["test", []]);
        expect(obj.post).toHaveBeenCalledTimes(1);

        promise.dispatch("post", [null, []]);
        expect(obj.post).toHaveBeenCalledTimes(1);

        promise.dispatch("post", [void 0, []]);
        expect(obj.post).toHaveBeenCalledTimes(1);
    });
});