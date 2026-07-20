import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call the post method when name is null', () => {
        const object = {
            post: jest.fn(),
            apply: jest.fn(),
        };

        const promise = Q.fulfill(object);
        promise.post(null, [1, 2, 3]);

        expect(object.post).toHaveBeenCalledTimes(0);
        expect(object.apply).toHaveBeenCalledTimes(1);
    });
});