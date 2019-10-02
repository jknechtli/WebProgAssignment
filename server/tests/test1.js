const expect = require('expect');
const JCalc = require('../dbFunc/linearPoint.js').JCalc;

describe('Server test', function () {
  // The function passed to before() is called before running the test cases.
  before(function () {
    console.log("before test");
  });

  // The function passed to after() is called after running the test cases.
  after(function () {
    console.log("after test");
  });

  describe('/dbFunc/JCalc', () => {
    it('should return 6', () => expect(JCalc(2, 1, 4)).toBe(6));
  });

  describe('/dbFunc/JCalc', () => {
    it('should return 4', () => expect(JCalc(2, 0, 4)).toBe(4));
  });

  describe('/dbFunc/JCalc', () => {
    it('should return 2', () => expect(JCalc(2, -1, 4)).toBe(2));
  });

});