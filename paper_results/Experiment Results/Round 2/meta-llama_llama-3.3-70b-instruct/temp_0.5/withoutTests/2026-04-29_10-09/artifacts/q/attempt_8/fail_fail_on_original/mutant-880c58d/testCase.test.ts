import { Q } from './q';

describe('Q', () => {
    it('should not have longStackSupport enabled by default and should be enabled when Q_DEBUG is set', () => {
        delete process.env.Q_DEBUG;
        expect(Q.longStackSupport).toBe(false);
        process.env.Q_DEBUG = 'true';
        // reload the module to get the updated Q
        delete require.cache[require.resolve('./q')];
        const updatedQ = require('./q').Q;
        expect(updatedQ.longStackSupport).toBe(true);
    });
});