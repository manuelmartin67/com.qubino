'use strict';

const constants = require('../../lib/constants');
const QubinoDevice = require('../../lib/QubinoDevice');

/**
 * Flush 1 Relay (ZMNHAA)
 * Manual: http://www.benext.eu/static/manual/qubino/flush-1-relay-ZMNHAA2.pdf
 */
class ZMNHAA extends QubinoDevice {

	/**
	 * Override allOnAllOff Z-Wave setting size.
	 * @returns {number}
	 */
	static get allOnAllOffSize() {
		return 1;
	}

	/**
	 * Override default multi channel configuration.
	 * @returns {boolean}
	 */
	get multiChannelConfigurationDisabled() {
		return true;
	}

	/**
	 * Expose input configuration, two possible inputs (input 2 and input 3).
	 * @returns {*[]}
	 */
	get inputConfiguration() {
		return [
			{
				id: 2,
				defaultEnabled: true,
			},
			{
				id: 3,
				defaultEnabled: true,
			},
		];
	}

	/**
	 * Method that will register capabilities of the device based on its configuration.
	 * @private
	 */
	registerCapabilities() {
		this.registerCapability(constants.capabilities.meterPower, constants.commandClasses.meter);
		this.registerCapability(constants.capabilities.measurePower, constants.commandClasses.meter);
		this.registerCapability(constants.capabilities.onoff, constants.commandClasses.switchBinary);
		this.registerCapability(constants.capabilities.measureTemperature, constants.commandClasses.sensorMultilevel);
	}

	/**
	 * Method that will register custom setting parsers for this device.
	 */
	registerSettings() {
		super.registerSettings();
		this.registerSetting(constants.settings.autoOff, value => value * 100);
	}
}

module.exports = ZMNHAA;