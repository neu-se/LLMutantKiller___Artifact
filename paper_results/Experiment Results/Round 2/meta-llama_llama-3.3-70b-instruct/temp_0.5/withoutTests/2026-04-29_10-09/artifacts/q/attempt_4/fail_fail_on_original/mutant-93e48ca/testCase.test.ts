import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call the apply method when the post method is called with no name', () => {
        const object = {
            apply: jest.fn(),
        };

        const promise = Q.fulfill(object);
        promise.post(null, [1, 2, 3]);

        expect(object.apply).toHaveBeenCalledTimes(1);
        expect(object.apply).toHaveBeenCalledWith(void 0, [1, 2, 3]);
    });
});