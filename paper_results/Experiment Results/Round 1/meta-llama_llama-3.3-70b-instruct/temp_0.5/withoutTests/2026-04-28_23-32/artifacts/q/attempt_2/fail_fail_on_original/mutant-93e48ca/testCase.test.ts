import { Q } from "../../../q.js";

describe("Q", () => {
    it("should call the post method with a valid name", () => {
        const obj = {
            post: jest.fn(),
        };

        const promise = Q(obj);
        promise.dispatch("post", ["test", []]);

        expect(obj.post).toHaveBeenCalledTimes(1);
    });
});