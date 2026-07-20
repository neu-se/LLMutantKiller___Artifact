import { Q } from "../../../q.js";

describe("Q", () => {
    it("should not call post when name is null or undefined", () => {
        const obj = {
            post: jest.fn(),
        };

        const promise = Q(obj);
        promise.dispatch("post", [null, []]);
        expect(obj.post).not.toHaveBeenCalled();

        promise.dispatch("post", [void 0, []]);
        expect(obj.post).not.toHaveBeenCalled();
    });
});