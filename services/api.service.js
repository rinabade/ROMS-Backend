"use strict";

const ApiGateway = require("moleculer-web");
const cors = require('cors');
// const { urlencoded } = require("express");
const path = require("path");
const serveStatic = require('serve-static')

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
		
		port:  5000,

		ip: "202.52.248.120",

		use: [cors()],

		        // Global CORS settings for all routes
				cors: {
					// Configures the Access-Control-Allow-Origin CORS header.
					origin: "http://202.52.248.120:3000",
					// Configures the Access-Control-Allow-Methods CORS header.
					methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"],
					// Configures the Access-Control-Allow-Headers CORS header.
					allowedHeaders: ['Content-Type', 'Authorization'],
					// Configures the Access-Control-Expose-Headers CORS header.
					exposedHeaders: [],
					// Configures the Access-Control-Allow-Credentials CORS header.
					credentials: false,
					// Configures the Access-Control-Max-Age CORS header.
					maxAge: 3600
				},

				// assets:{
				// 	folder: path.join(__dirname,"uploads"),
				// 	options: {}
				// },


		routes: [

			{
				path: "/api",

				cors: {
					origin: "http://202.52.248.120:3000",
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
				path: "/auth2",

				whitelist: [
					"role_permission.permissionCreate",
					"role_permission.getAllPermission",
					"role_permission.permissionUpdate",
					"role_permission.permissionDelete",
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
				path: "/admin",
				cors: {
					origin: "http://202.52.248.120:3000",
					allowedHeaders: ['Content-Type', 'Authorization'],
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

				aliases: {
					// "POST /file-upload":"multipart:menu.create",
				},

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
				cors: {
					origin: "http://202.52.248.120:3000",
						allowedHeaders: ['Content-Type', 'Authorization'],
						methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
						credentials: true,
						// Configures the Access-Control-Expose-Headers CORS header.
						exposedHeaders: [],
						// Configures the Access-Control-Max-Age CORS header.
						maxAge: 3600
				},

				whitelist: [
					"file-service.uploads",
					"file-service.profile",
					"file-service.getFeedbacks",
				],
				use: [
					// serveStatic(path.join(__dirname, "public"))
				],
				mergeParams: true,
				authentication: false,
				authorization: false,
				autoAliases: true,
				aliases: {
					"POST /file-upload":"multipart:file-service.uploads",
					"POST /profile-upload":"multipart:file-service.profile",

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
				cors: {
					origin: "http://202.52.248.120:3000",
						allowedHeaders: ['Content-Type', 'Authorization'],
						methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
						credentials: true,
						// Configures the Access-Control-Expose-Headers CORS header.
						exposedHeaders: [],
						// Configures the Access-Control-Max-Age CORS header.
						maxAge: 3600
				},

				whitelist: [
					"password.change",
					"profile.update",
					"profile.image"
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
					origin: "http://202.52.248.120:3000",
					allowedHeaders: ['Content-Type',],
					methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
					credentials: true,
					// Configures the Access-Control-Expose-Headers CORS header.
					exposedHeaders: [],
					// Configures the Access-Control-Max-Age CORS header.
					maxAge: 3600
				},

				whitelist: [
					"orders.getOrderDetails",
					"orderDetail.create",
					"orderDetail.update",
					"orderDetail.getOrderDetails",
					"orderDetail.delete",
					"feedback.create",
					"feedback.getAllFeedback",
					"feedback.delete",
					"search.searchFood",
					"payment.create",
					"payment.update",
					"payment.getPaymentDetail",
					"customerOrder.getOrders",
					"reservation.create",
					"reservation.get",
					"reservation.delete"
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
}

