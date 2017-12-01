import TokenDevice from '../models/TokenDevice';
import { resolve } from 'url';

async function findOne(tokenDevice) {
	return new Promise((resolve, reject) => {
		TokenDevice.findOne({tokenDevice}, (error, data) => {
			if (error) return reject(error);
			return resolve(data);
		});
	});
}

async function checkExistsToken(tokenDevice) {
	try {
		let device = await findOne(tokenDevice);
		console.log(device);
		if (device) return true;
		return false;	
	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 * Register token device
 * @tokenDevice: string
 * @userId: string
 */
async function regiterTokenDevice(req, res) {
	try {
		const {tokenDevice, userId} = req.body;
		console.log({ tokenDevice, userId });
		console.log('hehe');
		const isExists = await checkExistsToken(tokenDevice);
		if (isExists) {
			res.json({
				error: true,
				message: "Token have registed"
			});
			return;
		}
		let device = new TokenDevice({
			tokenDevice, userId
		});
		device = await device.save();
		res.json({device});
	}
	catch (e) {
		console.log(e);
	}
}

export default regiterTokenDevice;