"use strict";

const ApiGateway = require("moleculer-web");
const cors = require('cors');

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * @typedef {import('http').IncomingMessage} IncomingRequest Incoming HTTP Request
 * @typedef {import('http').ServerResponse} ServerResponse HTTP Server Response
 * @typedef {import('moleculer-web').ApiSettingsSchema} ApiSettingsSchema API Setting Schema
 */

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	/** @type {ApiSettingsSchema} More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html */
	settings: {
		port: process.env.PORT || 5000,

		ip: "0.0.0.0",

		use: [cors()],

		        // Global CORS settings for all routes
				// cors: {
				// 	// Configures the Access-Control-Allow-Origin CORS header.
				// 	origin: "*",
				// 	// Configures the Access-Control-Allow-Methods CORS header. 
				// 	methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"],
				// 	// Configures the Access-Control-Allow-Headers CORS header.
				// 	allowedHeaders: [],
				// 	// Configures the Access-Control-Expose-Headers CORS header.
				// 	exposedHeaders: [],
				// 	// Configures the Access-Control-Allow-Credentials CORS header.
				// 	credentials: false,
				// 	// Configures the Access-Control-Max-Age CORS header.
				// 	maxAge: 3600
				// },


		routes: [
			{
				path: "/api",

				// cors: {
				// 	origin: "*",
				// 	allowedHeaders: ['Content-Type', 'Authorization'],
				// 	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
				// 	credentials: true,
					
				// 	// Configures the Access-Control-Expose-Headers CORS header.
				// 	exposedHeaders: [],
				// 	// Configures the Access-Control-Max-Age CORS header.
				// 	maxAge: 3600
				// },

				whitelist: [
					"register.create",
					"register.update",
					"register.delete",
					"login.signin"
				],

				mergeParams: true,

				authentication: false,

				authorization: false,

				autoAliases: true,

				aliases: {

				},
				callingOptions: {},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},

				mappingPolicy: "all",

				logging: true
			},

			{
				path: "/admin",

				whitelist: [
					"role_permission.roleCreate",
					"role_permission.update",
					"role_permission.permission",
					"category.create",
					"category.update",
					"category.delete",
					"menu.create",
					"menu.update",
					"menu.delete",
					"ingredient.create",
					"ingredient.update",
					"ingredient.delete",
					"supplier.create",
					"supplier.update",
					"supplier.delete",
					"order_detail.placeOrder"					
				],

				use: [],

				mergeParams: true,

				authentication: true,

				authorization: false,

				autoAliases: true,

				aliases: {

				},

				callingOptions: {},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},

				mappingPolicy: "all", 
				logging: true
			},

			{
				path: "/change",

				whitelist: [
					"password.change"
				],

				use: [],

				mergeParams: true,

				authentication: true,

				authorization: false,

				autoAliases: true,

				aliases: {

				},

				callingOptions: {},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},

				mappingPolicy: "all", 

				logging: true
			},

			{
				path: "/forget",

				whitelist: [
					"forget.password",
					"reset.password",
				],

				use: [],

				mergeParams: true,

				authentication: false,

				authorization: false,

				autoAliases: true,

				aliases: {

				},

				callingOptions: {},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},

				mappingPolicy: "all", 

				logging: true
			},			
		],

		log4XXResponses: false,
		logRequestParams: null,
		logResponseData: null,

		assets: {
			folder: "public",
			options: {}
		},


		
	},

	methods: {
		
		async authenticate(ctx, routes, req) {
			const auth = req.headers["authorization"];
			if (!auth || !auth.startsWith("Bearer")) {
				throw new Error("Something went wrong in Authentication");
			}
			const token = auth.split(" ")[1];
			ctx.meta.token = token;
			ctx.meta.path = routes.path;
			ctx.meta.role = req.$action.authorization.role;
		},

		async authorize(ctx, routes, req) {
			
		}

	}
};
