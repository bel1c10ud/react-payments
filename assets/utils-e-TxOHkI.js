//#region src/constants/index.ts
var CARD_EXPIRY_MONTH_RANGE = Array.from({ length: 12 }).map((_, index) => String(index + 1).padStart(2, "0"));
var CARD_ISSUER = {
	bc: {
		issuerCode: "31",
		label: "BC카드"
	},
	shinhan: {
		issuerCode: "41",
		label: "신한카드"
	},
	kakao: {
		issuerCode: "15",
		label: "카카오뱅크"
	},
	hyundai: {
		issuerCode: "61",
		label: "현대카드"
	},
	woori: {
		issuerCode: "W1",
		label: "우리카드"
	},
	lotte: {
		issuerCode: "71",
		label: "롯데카드"
	},
	hana: {
		issuerCode: "21",
		label: "하나카드"
	},
	kookmin: {
		issuerCode: "11",
		label: "국민카드"
	}
};
var CARD_ISSUER_CODES = Object.values(CARD_ISSUER).map(({ issuerCode }) => issuerCode);
var CARD_NETWORK = {
	"VISA": {
		startPatterns: [{
			regex: /^4/,
			minMatchLength: 1
		}],
		cardValidationCodeLength: 3,
		cardNumberFormat: [
			4,
			4,
			4,
			4
		],
		cardNumberLength: 16
	},
	"MasterCard": {
		startPatterns: [{
			regex: /^(51|52|53|54|55)/,
			minMatchLength: 2
		}],
		cardValidationCodeLength: 3,
		cardNumberFormat: [
			4,
			4,
			4,
			4
		],
		cardNumberLength: 16
	},
	"Diners": {
		startPatterns: [{
			regex: /^36/,
			minMatchLength: 2
		}],
		cardValidationCodeLength: 3,
		cardNumberFormat: [
			4,
			6,
			4
		],
		cardNumberLength: 14
	},
	"AMEX": {
		startPatterns: [{
			regex: /^(34|37)/,
			minMatchLength: 2
		}],
		cardValidationCodeLength: 4,
		cardNumberFormat: [
			4,
			6,
			5
		],
		cardNumberLength: 15
	},
	"UnionPay": {
		startPatterns: [
			{
				regex: /^(62[4-6])/,
				minMatchLength: 3
			},
			{
				regex: /^(628[2-8])/,
				minMatchLength: 4
			},
			{
				regex: /^(62212[6-9]|6221[3-9]\d|622[2-8]\d{2}|6229[01]\d|62292[0-5])/,
				minMatchLength: 6
			}
		],
		cardValidationCodeLength: 3,
		cardNumberFormat: [
			4,
			4,
			4,
			4
		],
		cardNumberLength: 16
	}
};
//#endregion
//#region src/utils/index.ts
function validateDigits(input) {
	return /^\d+$/.test(input);
}
function validateStringLength(input, length) {
	return input.length === length;
}
function validateStringMaxLength(input, maxLength) {
	return input.length <= maxLength;
}
function validateMonth(input) {
	return CARD_EXPIRY_MONTH_RANGE.includes(input);
}
function validateCardIssuer(input) {
	return CARD_ISSUER_CODES.includes(input);
}
function createDigitFieldValidations(length) {
	return [
		{
			type: "onChange",
			validator: validateDigits,
			message: "숫자만 입력 가능합니다."
		},
		{
			type: "onChange",
			validator: (input) => validateStringMaxLength(input, length),
			message: `${length}자리까지 입력 가능합니다.`
		},
		{
			type: "onBlur",
			validator: (input) => validateStringLength(input, length),
			message: `${length}자리를 입력해주세요.`
		}
	];
}
function getCardNetwork(cardNumberSegments) {
	const cardNumber = cardNumberSegments.join("");
	for (const [network, config] of Object.entries(CARD_NETWORK)) if (config.startPatterns.some(({ regex, minMatchLength }) => cardNumber.length >= minMatchLength && regex.test(cardNumber))) return network;
	return null;
}
//#endregion
export { validateMonth as a, CARD_ISSUER_CODES as c, validateDigits as i, CARD_NETWORK as l, getCardNetwork as n, validateStringLength as o, validateCardIssuer as r, CARD_ISSUER as s, createDigitFieldValidations as t };
