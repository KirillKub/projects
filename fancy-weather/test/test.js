const assert = require('chai').assert
const COUNTRY = require('../lib/country.js')

describe('Country', function() {
    it('should return Belarus when country code BY', function() {
      assert.equal(COUNTRY.default['BY'], 'Belarus');
    });
    it('should return Russia when country code RU', function() {
        assert.equal(COUNTRY.default['RU'], 'Russia');
    });
    it('should return France when country code Fr', function() {
        assert.equal(COUNTRY.default['FR'], 'France');
    });
    it('should return Object', function() {
        assert.typeOf(COUNTRY, 'Object');
    });
});
