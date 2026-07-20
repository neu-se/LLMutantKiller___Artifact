import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when done is called with no arguments and process.domain is truthy', () => {
        const originalProcessDomain = (global as any).process.domain;
        (global as any).process.domain = {};
        const promise = Q.resolve();
        expect(() => promise.done()).toThrowError();
        (global as any).process.domain = originalProcessDomain;
    });
});