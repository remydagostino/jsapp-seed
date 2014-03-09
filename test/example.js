var util = require('../src/js/util.js'),
	should = require('should'),
	jsDom = require('jsdom');

describe('Test driven development', function() {
	it('starts with tests which fail', function() {
		should(true).ok;
	});

	it('then writes code which makes tests pass', function() {
		util.testMe().should.equal('yes');
	});

	it('\'s important to test that dom interaction works', function(done) {
		jsDom.env({
			file: './test/fixtures/dummy.html',
			done: function(err, window) {
				var h1 = window.document.querySelectorAll('.myH1')[0];
				should(h1.innerHTML).equal('Hello');

				// Async test is done
				done();
			}
		});
	});
});