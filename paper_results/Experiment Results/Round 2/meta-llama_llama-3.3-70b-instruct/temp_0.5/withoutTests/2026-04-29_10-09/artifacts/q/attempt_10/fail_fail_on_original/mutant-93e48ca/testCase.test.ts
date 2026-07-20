describe('Q', () => {
    it('should call the apply method when name is null', () => {
        const object = {
            post: jest.fn(),
            apply: jest.fn(),
        };

        const Q = require('../../../../../../../q.js');
        const promise = Q.fulfill(object);
        promise.post(null, [1, 2, 3]);

        expect(object.apply).toHaveBeenCalledTimes(1);
    });
});