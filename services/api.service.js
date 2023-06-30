"use strict";

const ApiGateway = require("moleculer-web");
const cors = require('cors');
// const { urlencoded } = require("express");
const path = require("path");

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
				cors: {
					// Configures the Access-Control-Allow-Origin CORS header.
					origin: "*",
					// Configures the Access-Control-Allow-Methods CORS header. 
					methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"],
					// Configures the Access-Control-Allow-Headers CORS header.
					allowedHeaders: ['Content-Type'],
					// Configures the Access-Control-Expose-Headers CORS header.
					exposedHeaders: [],
					// Configures the Access-Control-Allow-Credentials CORS header.
					credentials: false,
					// Configures the Access-Control-Max-Age CORS header.
					maxAge: 3600
				},

				assets:{
					folder: path.join(__dirname,"uploads"),
					options: {}
				},


		routes: [
			{
				path: "/api",

				cors: {
					origin: "*",
					allowedHeaders: ['Content-Type'],
					methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
					credentials: true,					
					// Configures the Access-Control-Expose-Headers CORS header.
					exposedHeaders: [],
					// Configures the Access-Control-Max-Age CORS header.
					maxAge: 3600
				},

				whitelist: [
					"register.create",
					"register.getAllEmployees",
					"register.getEmployee",
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
				path: "/auth1",

				whitelist: [
					"role_permission.roleCreate",
					"role_permission.getAllRoles",
					"role_permission.roleUpdate",
					"role_permission.roleDelete",

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
				path: "/auth2",

				whitelist: [
					"role_permission.permissionCreate",		
					"role_permission.getAllPermission",
					"role_permission.permissionUpdate",
					"role_permission.permissionDelete",		
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
				path: "/admin",
				cors: {
					origin: "*",
					allowedHeaders: ['Content-Type'],
					methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
					credentials: true,					
					// Configures the Access-Control-Expose-Headers CORS header.
					exposedHeaders: [],
					// Configures the Access-Control-Max-Age CORS header.
					maxAge: 3600
				},

				whitelist: [
					"category.create",
					"category.update",
					"category.getAllCategory",
					"category.getCategory",
					"category.delete",
					"menu.create",
					"menu.getMenu",
					"menu.getAllMenu",
					"menu.update",
					"menu.delete",
				],

				use: [],

				mergeParams: true,

				authentication: false,

				authorization: false,

				autoAliases: true,

				aliases: {},
				
				callingOptions: {},

				bodyParsers: {
					json: {
						strict: true,
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
				path: "/upload",
				
				whitelist: [
					"file-service.uploads"
				],
				use: [],
				mergeParams: true,
				authentication: false,
				authorization: false,
				autoAliases: true,				
				aliases: {
					"POST /file-upload":"multipart:file-service.uploads",
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
					"password.change",
					"profile.update"
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
			
			{
				path: "/customer",
				cors: {
					origin: "*",
					allowedHeaders: ['Content-Type'],
					methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
					credentials: true,					
					// Configures the Access-Control-Expose-Headers CORS header.
					exposedHeaders: [],
					// Configures the Access-Control-Max-Age CORS header.
					maxAge: 3600
				},

				whitelist: [
					"cart.create",
					"cart.update",
					"cart.getAllCart",
					"feedback.create",
					"feedback.getAllFeedback",
					"feedback.delete",
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
