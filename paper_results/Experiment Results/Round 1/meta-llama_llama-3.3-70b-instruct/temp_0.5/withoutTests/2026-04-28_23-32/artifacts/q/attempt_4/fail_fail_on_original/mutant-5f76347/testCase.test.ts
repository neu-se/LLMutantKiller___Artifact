import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should dispatch delete operation with the correct key', () => {
        const object = { foo: 'bar', dispatch: jest.fn() };
        Q(object).del('foo');
        expect(object.dispatch).toBeCalledWith('delete', ['foo']);
    });
});