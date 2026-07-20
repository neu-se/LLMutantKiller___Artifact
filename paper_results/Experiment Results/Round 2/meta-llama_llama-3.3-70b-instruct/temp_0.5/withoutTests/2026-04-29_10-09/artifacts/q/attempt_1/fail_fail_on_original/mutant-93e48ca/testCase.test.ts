import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should not call the post method with no name', () => {
        const object = {
            post: jest.fn(),
            apply: jest.fn(),
        };

        Q.fulfill(object).post(null, [1, 2, 3]);

        expect(object.post).not.toHaveBeenCalled();
        expect(object.apply).toHaveBeenCalledTimes(1);
        expect(object.apply).toHaveBeenCalledWith(void 0, [1, 2, 3]);
    });
});