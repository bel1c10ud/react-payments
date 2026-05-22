import { a as validateMonth, c as CARD_ISSUER_CODES, i as validateDigits, n as getCardNetwork, o as validateStringLength, u as CARD_NETWORK } from "./utils-CD20oNb4.js";
import { a as RequestHandler, c as statuses_default, g as devUtils, l as toPublicUrl, n as cleanUrl, o as HttpResponse, r as cookieStore, t as matchRequestUrl } from "./matchRequestUrl-CIdvF2RO.js";
//#region node_modules/msw/lib/core/utils/logging/getTimestamp.mjs
function getTimestamp(options) {
	const now = /* @__PURE__ */ new Date();
	const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
	if (options?.milliseconds) return `${timestamp}.${now.getMilliseconds().toString().padStart(3, "0")}`;
	return timestamp;
}
//#endregion
//#region node_modules/msw/lib/core/utils/internal/isStringEqual.mjs
function isStringEqual(actual, expected) {
	return actual.toLowerCase() === expected.toLowerCase();
}
//#endregion
//#region node_modules/msw/lib/core/utils/logging/getStatusCodeColor.mjs
function getStatusCodeColor(status) {
	if (status < 300) return "#69AB32";
	if (status < 400) return "#F0BB4B";
	return "#E95F5D";
}
//#endregion
//#region node_modules/msw/lib/core/utils/logging/serializeRequest.mjs
async function serializeRequest(request) {
	const requestText = await request.clone().text();
	return {
		url: new URL(request.url),
		method: request.method,
		headers: Object.fromEntries(request.headers.entries()),
		body: requestText
	};
}
//#endregion
//#region node_modules/msw/lib/core/utils/logging/serializeResponse.mjs
var { message } = statuses_default;
async function serializeResponse(response) {
	const responseClone = response.clone();
	const responseText = await responseClone.text();
	const responseStatus = responseClone.status || 200;
	return {
		status: responseStatus,
		statusText: responseClone.statusText || message[responseStatus] || "OK",
		headers: Object.fromEntries(responseClone.headers.entries()),
		body: responseText
	};
}
//#endregion
//#region node_modules/msw/lib/shims/cookie.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var allCookie = __toESM(__commonJS({ "node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js"(exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseCookie = parseCookie;
	exports.parse = parseCookie;
	exports.stringifyCookie = stringifyCookie;
	exports.stringifySetCookie = stringifySetCookie;
	exports.serialize = stringifySetCookie;
	exports.parseSetCookie = parseSetCookie;
	exports.stringifySetCookie = stringifySetCookie;
	exports.serialize = stringifySetCookie;
	var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
	var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
	var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
	var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
	var maxAgeRegExp = /^-?\d+$/;
	var __toString = Object.prototype.toString;
	var NullObject = /* @__PURE__ */ (() => {
		const C = function() {};
		C.prototype = /* @__PURE__ */ Object.create(null);
		return C;
	})();
	function parseCookie(str, options) {
		const obj = new NullObject();
		const len = str.length;
		if (len < 2) return obj;
		const dec = options?.decode || decode;
		let index = 0;
		do {
			const eqIdx = eqIndex(str, index, len);
			if (eqIdx === -1) break;
			const endIdx = endIndex(str, index, len);
			if (eqIdx > endIdx) {
				index = str.lastIndexOf(";", eqIdx - 1) + 1;
				continue;
			}
			const key = valueSlice(str, index, eqIdx);
			if (obj[key] === void 0) obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
			index = endIdx + 1;
		} while (index < len);
		return obj;
	}
	function stringifyCookie(cookie2, options) {
		const enc = options?.encode || encodeURIComponent;
		const cookieStrings = [];
		for (const name of Object.keys(cookie2)) {
			const val = cookie2[name];
			if (val === void 0) continue;
			if (!cookieNameRegExp.test(name)) throw new TypeError(`cookie name is invalid: ${name}`);
			const value = enc(val);
			if (!cookieValueRegExp.test(value)) throw new TypeError(`cookie val is invalid: ${val}`);
			cookieStrings.push(`${name}=${value}`);
		}
		return cookieStrings.join("; ");
	}
	function stringifySetCookie(_name, _val, _opts) {
		const cookie2 = typeof _name === "object" ? _name : {
			..._opts,
			name: _name,
			value: String(_val)
		};
		const enc = (typeof _val === "object" ? _val : _opts)?.encode || encodeURIComponent;
		if (!cookieNameRegExp.test(cookie2.name)) throw new TypeError(`argument name is invalid: ${cookie2.name}`);
		const value = cookie2.value ? enc(cookie2.value) : "";
		if (!cookieValueRegExp.test(value)) throw new TypeError(`argument val is invalid: ${cookie2.value}`);
		let str = cookie2.name + "=" + value;
		if (cookie2.maxAge !== void 0) {
			if (!Number.isInteger(cookie2.maxAge)) throw new TypeError(`option maxAge is invalid: ${cookie2.maxAge}`);
			str += "; Max-Age=" + cookie2.maxAge;
		}
		if (cookie2.domain) {
			if (!domainValueRegExp.test(cookie2.domain)) throw new TypeError(`option domain is invalid: ${cookie2.domain}`);
			str += "; Domain=" + cookie2.domain;
		}
		if (cookie2.path) {
			if (!pathValueRegExp.test(cookie2.path)) throw new TypeError(`option path is invalid: ${cookie2.path}`);
			str += "; Path=" + cookie2.path;
		}
		if (cookie2.expires) {
			if (!isDate(cookie2.expires) || !Number.isFinite(cookie2.expires.valueOf())) throw new TypeError(`option expires is invalid: ${cookie2.expires}`);
			str += "; Expires=" + cookie2.expires.toUTCString();
		}
		if (cookie2.httpOnly) str += "; HttpOnly";
		if (cookie2.secure) str += "; Secure";
		if (cookie2.partitioned) str += "; Partitioned";
		if (cookie2.priority) switch (typeof cookie2.priority === "string" ? cookie2.priority.toLowerCase() : void 0) {
			case "low":
				str += "; Priority=Low";
				break;
			case "medium":
				str += "; Priority=Medium";
				break;
			case "high":
				str += "; Priority=High";
				break;
			default: throw new TypeError(`option priority is invalid: ${cookie2.priority}`);
		}
		if (cookie2.sameSite) switch (typeof cookie2.sameSite === "string" ? cookie2.sameSite.toLowerCase() : cookie2.sameSite) {
			case true:
			case "strict":
				str += "; SameSite=Strict";
				break;
			case "lax":
				str += "; SameSite=Lax";
				break;
			case "none":
				str += "; SameSite=None";
				break;
			default: throw new TypeError(`option sameSite is invalid: ${cookie2.sameSite}`);
		}
		return str;
	}
	function parseSetCookie(str, options) {
		const dec = options?.decode || decode;
		const len = str.length;
		const endIdx = endIndex(str, 0, len);
		const eqIdx = eqIndex(str, 0, endIdx);
		const setCookie = eqIdx === -1 ? {
			name: "",
			value: dec(valueSlice(str, 0, endIdx))
		} : {
			name: valueSlice(str, 0, eqIdx),
			value: dec(valueSlice(str, eqIdx + 1, endIdx))
		};
		let index = endIdx + 1;
		while (index < len) {
			const endIdx2 = endIndex(str, index, len);
			const eqIdx2 = eqIndex(str, index, endIdx2);
			const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
			const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
			switch (attr.toLowerCase()) {
				case "httponly":
					setCookie.httpOnly = true;
					break;
				case "secure":
					setCookie.secure = true;
					break;
				case "partitioned":
					setCookie.partitioned = true;
					break;
				case "domain":
					setCookie.domain = val;
					break;
				case "path":
					setCookie.path = val;
					break;
				case "max-age":
					if (val && maxAgeRegExp.test(val)) setCookie.maxAge = Number(val);
					break;
				case "expires":
					if (!val) break;
					const date = new Date(val);
					if (Number.isFinite(date.valueOf())) setCookie.expires = date;
					break;
				case "priority":
					if (!val) break;
					const priority = val.toLowerCase();
					if (priority === "low" || priority === "medium" || priority === "high") setCookie.priority = priority;
					break;
				case "samesite":
					if (!val) break;
					const sameSite = val.toLowerCase();
					if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") setCookie.sameSite = sameSite;
					break;
			}
			index = endIdx2 + 1;
		}
		return setCookie;
	}
	function endIndex(str, min, len) {
		const index = str.indexOf(";", min);
		return index === -1 ? len : index;
	}
	function eqIndex(str, min, max) {
		const index = str.indexOf("=", min);
		return index < max ? index : -1;
	}
	function valueSlice(str, min, max) {
		let start = min;
		let end = max;
		do {
			const code = str.charCodeAt(start);
			if (code !== 32 && code !== 9) break;
		} while (++start < end);
		while (end > start) {
			const code = str.charCodeAt(end - 1);
			if (code !== 32 && code !== 9) break;
			end--;
		}
		return str.slice(start, end);
	}
	function decode(str) {
		if (str.indexOf("%") === -1) return str;
		try {
			return decodeURIComponent(str);
		} catch (e) {
			return str;
		}
	}
	function isDate(val) {
		return __toString.call(val) === "[object Date]";
	}
} })(), 1);
var cookie = allCookie.default || allCookie;
var parse = cookie.parse;
var serialize = cookie.serialize;
//#endregion
//#region node_modules/msw/lib/core/utils/request/getRequestCookies.mjs
function parseCookies(input) {
	const parsedCookies = parse(input);
	const cookies = {};
	for (const cookieName in parsedCookies) if (typeof parsedCookies[cookieName] !== "undefined") cookies[cookieName] = parsedCookies[cookieName];
	return cookies;
}
function getAllDocumentCookies() {
	return parseCookies(document.cookie);
}
function getDocumentCookies(request) {
	if (typeof document === "undefined" || typeof location === "undefined") return {};
	switch (request.credentials) {
		case "same-origin": {
			const requestUrl = new URL(request.url);
			return location.origin === requestUrl.origin ? getAllDocumentCookies() : {};
		}
		case "include": return getAllDocumentCookies();
		default: return {};
	}
}
function getAllRequestCookies(request) {
	const requestCookieHeader = request.headers.get("cookie");
	const cookiesFromHeaders = requestCookieHeader ? parseCookies(requestCookieHeader) : {};
	const cookiesFromDocument = getDocumentCookies(request);
	for (const name in cookiesFromDocument) request.headers.append("cookie", serialize(name, cookiesFromDocument[name]));
	const cookiesFromStore = cookieStore.getCookies(request.url);
	const storedCookiesObject = Object.fromEntries(cookiesFromStore.map((cookie) => [cookie.key, cookie.value]));
	for (const cookie of cookiesFromStore) request.headers.append("cookie", cookie.toString());
	return {
		...cookiesFromDocument,
		...storedCookiesObject,
		...cookiesFromHeaders
	};
}
//#endregion
//#region node_modules/msw/lib/core/handlers/HttpHandler.mjs
var HttpMethods = /* @__PURE__ */ ((HttpMethods2) => {
	HttpMethods2["HEAD"] = "HEAD";
	HttpMethods2["GET"] = "GET";
	HttpMethods2["POST"] = "POST";
	HttpMethods2["PUT"] = "PUT";
	HttpMethods2["PATCH"] = "PATCH";
	HttpMethods2["OPTIONS"] = "OPTIONS";
	HttpMethods2["DELETE"] = "DELETE";
	return HttpMethods2;
})(HttpMethods || {});
var HttpHandler = class extends RequestHandler {
	constructor(method, predicate, resolver, options) {
		const displayPath = typeof predicate === "function" ? "[custom predicate]" : predicate;
		super({
			info: {
				header: `${method}${displayPath ? ` ${displayPath}` : ""}`,
				path: predicate,
				method
			},
			resolver,
			options
		});
		this.checkRedundantQueryParameters();
	}
	checkRedundantQueryParameters() {
		const { method, path } = this.info;
		if (!path || path instanceof RegExp || typeof path === "function") return;
		if (cleanUrl(path) === path) return;
		devUtils.warn(`Found a redundant usage of query parameters in the request handler URL for "${method} ${path}". Please match against a path instead and access query parameters using "new URL(request.url).searchParams" instead. Learn more: https://mswjs.io/docs/http/intercepting-requests#querysearch-parameters`);
	}
	async parse(args) {
		const url = new URL(args.request.url);
		const cookies = getAllRequestCookies(args.request);
		if (typeof this.info.path === "function") {
			const customPredicateResult = await this.info.path({
				request: args.request,
				cookies
			});
			return {
				match: typeof customPredicateResult === "boolean" ? {
					matches: customPredicateResult,
					params: {}
				} : customPredicateResult,
				cookies
			};
		}
		return {
			match: this.info.path ? matchRequestUrl(url, this.info.path, args.resolutionContext?.baseUrl) : {
				matches: false,
				params: {}
			},
			cookies
		};
	}
	async predicate(args) {
		const hasMatchingMethod = this.matchMethod(args.request.method);
		const hasMatchingUrl = args.parsedResult.match.matches;
		return hasMatchingMethod && hasMatchingUrl;
	}
	matchMethod(actualMethod) {
		return this.info.method instanceof RegExp ? this.info.method.test(actualMethod) : isStringEqual(this.info.method, actualMethod);
	}
	extendResolverArgs(args) {
		return {
			params: args.parsedResult.match?.params || {},
			cookies: args.parsedResult.cookies
		};
	}
	async log(args) {
		const publicUrl = toPublicUrl(args.request.url);
		const loggedRequest = await serializeRequest(args.request);
		const loggedResponse = await serializeResponse(args.response);
		const statusColor = getStatusCodeColor(loggedResponse.status);
		console.groupCollapsed(devUtils.formatMessage(`${getTimestamp()} ${args.request.method} ${publicUrl} (%c${loggedResponse.status} ${loggedResponse.statusText}%c)`), `color:${statusColor}`, "color:inherit");
		console.log("Request", loggedRequest);
		console.log("Handler:", this);
		console.log("Response", loggedResponse);
		console.groupEnd();
	}
};
//#endregion
//#region node_modules/msw/lib/core/http.mjs
function createHttpHandler(method) {
	return (predicate, resolver, options = {}) => {
		return new HttpHandler(method, predicate, resolver, options);
	};
}
var http = {
	all: createHttpHandler(/.+/),
	head: createHttpHandler(HttpMethods.HEAD),
	get: createHttpHandler(HttpMethods.GET),
	post: createHttpHandler(HttpMethods.POST),
	put: createHttpHandler(HttpMethods.PUT),
	delete: createHttpHandler(HttpMethods.DELETE),
	patch: createHttpHandler(HttpMethods.PATCH),
	options: createHttpHandler(HttpMethods.OPTIONS)
};
//#endregion
//#region src/constants/api.ts
var ERROR_MESSAGE = {
	INVALID_CARD_NUMBER: "유효하지 않은 카드 번호입니다.",
	INVALID_CVC: "유효하지 않은 CVC입니다.",
	INVALID_EXPIRATION_DATE: "유효하지 않은 만료일입니다.",
	INVALID_ISSUER_CODE: "지원하지 않는 카드사입니다."
};
//#endregion
//#region src/utils/api.ts
function createErrorResponse(code) {
	return HttpResponse.json({
		code,
		message: ERROR_MESSAGE[code]
	}, { status: 400 });
}
function validateCardNumber(cardNumber) {
	const cardNetwork = getCardNetwork([cardNumber]);
	if (cardNetwork === null) return false;
	return validateDigits(cardNumber) && validateStringLength(cardNumber, CARD_NETWORK[cardNetwork].cardNumberLength);
}
function validateCardCVC(cvc) {
	return validateDigits(cvc) && (validateStringLength(cvc, 3) || validateStringLength(cvc, 4)) && !/^0{3,4}$/.test(cvc);
}
function validateExpirationDate(expirationDate) {
	const [month, year, ...rest] = expirationDate.split("/");
	return rest.length === 0 && month !== void 0 && year !== void 0 && validateMonth(month) && validateStringLength(year, 2) && validateDigits(year);
}
function validateCardIssuerCode(issuerCode) {
	return CARD_ISSUER_CODES.some((cardIssuerCode) => cardIssuerCode === issuerCode);
}
function maskCardNumber(cardNumber) {
	return cardNumber.slice(0, 6) + Array.from({ length: cardNumber.length - 6 - 4 }).map(() => "*").join("") + cardNumber.slice(-4);
}
//#endregion
//#region src/mocks/handlers.ts
var cards = [];
var handlers = [
	http.post(`/react-payments/cards`, async ({ request }) => {
		const body = await request.json();
		if (!validateCardNumber(body.number)) return createErrorResponse("INVALID_CARD_NUMBER");
		if (!validateCardCVC(body.cvc)) return createErrorResponse("INVALID_CVC");
		if (!validateExpirationDate(body.expirationDate)) return createErrorResponse("INVALID_EXPIRATION_DATE");
		if (!validateCardIssuerCode(body.issuerCode)) return createErrorResponse("INVALID_ISSUER_CODE");
		const id = crypto.randomUUID();
		cards.push({
			id,
			issuerCode: body.issuerCode,
			number: maskCardNumber(body.number),
			expirationDate: body.expirationDate
		});
		return HttpResponse.json({ id }, { status: 201 });
	}),
	http.get(`/react-payments/cards`, () => HttpResponse.json(cards, { status: 200 })),
	http.delete(`/react-payments/cards/:id`, ({ params }) => {
		const cardIndex = cards.findIndex((card) => card.id === params.id);
		if (cardIndex >= 0) cards.splice(cardIndex, 1);
		return new HttpResponse(null, { status: 204 });
	})
];
//#endregion
export { handlers };
