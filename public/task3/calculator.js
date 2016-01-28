window.RT = window.RT || {};
window.RT.Calculator = window.RT.Calculator || function (){}

window.RT.Calculator.prototype = {
	constructor: window.RT.Calculator,
	triangle: function (params) {
		var validation = this.validateObj(params);
		if (validation === true) {
			return 0.5 * params.base * params.height;
		} else {
			return validation;
		}
	},
	rectangle: function (params) {
		var validation = this.validateObj(params);
		if (validation === true) {
			return params.width * params.height;
		} else {
			return validation;
		}
	},
	parallelogram: function (params) {
		var validation = this.validateObj(params);
		if (validation === true) {
			return params.base * params.height;
		} else {
			return validation;
		}
	},
	circle: function (params) {
		var validation = this.validateObj(params);
		if (validation === true) {
			if (typeof params.diameter === 'undefined') {
				return Math.PI * Math.pow(params.radius, 2);
			} else if (typeof params.radius === 'undefined') {
				return Math.PI * Math.pow(params.diameter/2, 2);
			}
		} else {
			return validation;
		}
	},
	validateObj: function (params) {
		if (params === null || typeof params !== 'object' || typeof params.shape !== 'string') return 'incomplete parameters';
		switch(params.shape){
			case 'triangle': 
				return (typeof params.base === 'number' && typeof params.height === 'number') ? true : 'invalid parameter'; 
				break;
			case 'rectangle':
				return (typeof params.width === 'number' && typeof params.height === 'number') ? true : 'invalid parameter';
				break;
			case 'parallelogram':
				return (typeof params.base === 'number' && typeof params.height === 'number') ? true : 'invalid parameter';
				break;
			case 'circle':
				return (typeof params.diameter === 'number' || typeof params.radius === 'number') ? true : 'invalid parameter';
				break;
			default:
				return false;
		}
	}
}
