/// <reference path="../calculator.js" />
/// <reference path="../mock-WindowObj.js" />

describe("RTCalculatorSpec", function () {
  it("should be defined", function () {
  	expect(window.RT.Calculator).toBeDefined();
  });

  describe('should return error msg with incomplete arguments', function () {
    it('empty object', function () {
    	expect(cal.triangle({})).toBe("incomplete parameters");
    });
    it('null object', function () {
    	expect(cal.triangle(null)).toBe("incomplete parameters");
    });
    it('single number', function () {
    	expect(cal.triangle(1)).toBe("incomplete parameters");
    });
    it('simple text input', function () {
    	expect(cal.triangle("text")).toBe("incomplete parameters");
    });
    it('shape attribute null', function () {
    	expect(cal.triangle({ shape: null, base: 10, height: 10 })).toBe("incomplete parameters");
    });
    it('shape attribute is number', function () {
    	expect(cal.triangle({ shape: 1, base: 10, height: 10 })).toBe("incomplete parameters");
    });
    it('shape attribute is object', function () {
    	expect(cal.triangle({ shape: {}, base: 10, height: 10 })).toBe("incomplete parameters");
    });
  });

  describe('should return error message with triagle calculation', function () {
  	it('height attribute is missing', function () {
  		expect(cal.triangle({ shape: 'triangle', base: 10})).toBe("invalid parameter");
  	});
  	it('height attribute is null', function () {
  		expect(cal.triangle({ shape: 'triangle', base: 10, height: null })).toBe("invalid parameter");
  	});
  	it('height attribute is text', function () {
  		expect(cal.triangle({ shape: 'triangle', base: 10, height: 'a' })).toBe("invalid parameter");
  	});
  	it('height attribute is object', function () {
  		expect(cal.triangle({ shape: 'triangle', base: 10, height: {} })).toBe("invalid parameter");
  	});
  	it('base attribute is missing', function () {
  		expect(cal.triangle({ shape: 'triangle', height: 10 })).toBe("invalid parameter");
  	});
  	it('base attribute is null', function () {
  		expect(cal.triangle({ shape: 'triangle', base: null, height: 10 })).toBe("invalid parameter");
  	});
  	it('base attribute is text', function () {
  		expect(cal.triangle({ shape: 'triangle', base: 'a', height: 10 })).toBe("invalid parameter");
  	});
  	it('base attribute is object', function () {
  		expect(cal.triangle({ shape: 'triangle', base: {}, height: 10 })).toBe("invalid parameter");
  	});
  });

	//same for the other 3 types of calculation

  describe('should return success calculation cases', function () {
  	it('should return right triangle area', function () {
  		expect(cal.triangle({ shape: 'triangle', base: 10, height: 5 })).toBe(25);
  	});
  	it('should return right rectangle area', function () {
  		expect(cal.rectangle({ shape: 'rectangle', width: 10, height: 5 })).toBe(50);
  	});
  	it('should return right parallelogram area', function () {
  		expect(cal.parallelogram({ shape: 'parallelogram', base: 10, height: 5 })).toBe(50);
  	});
  	it('should return right circle area', function () {
  		expect(cal.circle({ shape: 'circle', radius: 10 })).toBe(62.83185307179586);
  	});
  	it('should return right circle area', function () {
  		expect(cal.circle({ shape: 'circle', diameter: 10 })).toBe(31.41592653589793);
  	});
  });
});