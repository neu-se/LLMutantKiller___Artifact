import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call the post method with a name when the post method is called with a name', () => {
        const object = {
            post: jest.fn(),
        };

        const promise = Q.fulfill(object);
        promise.post('test', [1, 2, 3]);

        expect(object.post).toHaveBeenCalledTimes(1);
        expect(object.post).toHaveBeenCalledWith('test', [1, 2, 3]);
    });
});