import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.post", () => {
    it("should call the post method with the correct name and arguments", () => {
        const obj = {
            post: jest.fn(),
            apply: jest.fn(),
        };

        Q.fulfill(obj).post(null, [1, 2, 3]);

        expect(obj.apply).toHaveBeenCalledTimes(1);
        expect(obj.apply).toHaveBeenCalledWith(void 0, [1, 2, 3]);
    });
});