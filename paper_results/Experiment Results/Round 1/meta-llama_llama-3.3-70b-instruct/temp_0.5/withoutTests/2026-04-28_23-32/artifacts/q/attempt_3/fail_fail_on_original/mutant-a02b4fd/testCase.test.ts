import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.post", () => {
    it("should call the post method with the correct name and arguments", () => {
        const obj = {
            post: jest.fn(),
            apply: jest.fn(),
        };

        Q.fulfill(obj).post('test', [1, 2, 3]);

        expect(obj.post).toHaveBeenCalledTimes(1);
        expect(obj.post).toHaveBeenCalledWith('test', [1, 2, 3]);
    });
});