// Copyright (c) 2014-2019, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
"use strict"

//
import TXTRecordResolver from '../../OpenAlias/TXTResolver.web';
import Pasteboard from '../../Pasteboard/Pasteboard.browser';
import URLBrowser from "../../URLBrowser/URLBrowser.browser";
import FilesystemUI from "../../FilesystemUI/FilesystemUI.browser";
import WindowDialogs from "../../WindowDialogs/WindowDialogs.browser";
import CcyConversionRates from "../../CcyConversionRates/Controller";
import Locale from "../../Locale/Locale.browser";
import symmetric_cryptor from "../../symmetric_cryptor/BackgroundStringCryptor.noOp";
import ContactsListController from "../../Contacts/Controllers/ContactsListController"
import DocumentPersister from "../../DocumentPersister/DocumentPersister.SecureStorage";
import backgroundAPIResponseParser from "../../HostedMoneroAPIClient/BackgroundResponseParser.web";
import HostedMoneroAPIClient from "../../HostedMoneroAPIClient/HostedMoneroAPIClient.Lite"; 
import OpenAlias from "../../OpenAlias/OpenAliasResolver";
import Theme from "../../Theme/ThemeController";
import FundsRequestsListController from "../../RequestFunds/Controllers/FundsRequestsListController"
import Passwords from "../../Passwords/Controllers/PasswordController.Full";
import Settings from "../../Settings/Controllers/SettingsController";
import UserIdle from "../../UserIdle/UserIdleInWindowController";
import WalletsList from "../../WalletsList/Controllers/WalletsListController.Full";
import WalletAppCoordinator from "../../WalletAppCoordinator/WalletAppCoordinator";
import runtimeContext from "../../runtime_context/runtime_context";
import exceptionAlerting from "../Controllers/ExceptionAlerting.browser.web.js"

const txtRecordResolver = new TXTRecordResolver({})
function NewHydratedContext(initialContext)
{
	initialContext = initialContext || {}
	const app = initialContext.app
	if (!app) {
		throw "app required"
	}
	//
	// placing context_object_instantiation_descriptions in here so we can get the console opened in time to catch any errors (sigh)
	var context_object_instantiation_descriptions =
	[
		// using module+require instead of module_path+string b/c browserify/webpack can't handle dynamic requires
		{
			module: Pasteboard,
			instance_key: "pasteboard",
			options: {}
		},
		{
			module: URLBrowser,
			instance_key: "urlBrowser",
			options: {}
		},
		{
			module: FilesystemUI,
			instance_key: "filesystemUI",
			options: {}
		},
		{
			module: WindowDialogs,
			instance_key: "windowDialogs",
			options: {}
		},
		//
		// services
		{
			module: CcyConversionRates,
			instance_key: "CcyConversionRates_Controller_shared",
			options: {}
		},
		{
			module: Locale,
			instance_key: "locale",
			options: {}
		},
		{ // is not actually background, at the moment
			module: symmetric_cryptor,
			instance_key: "string_cryptor__background",
			options: {}
		},
		{
			module: DocumentPersister,
			instance_key: "persister",
			options: {
			}
		},
		// {
		// 	module: require("../../HostedMoneroAPIClient/BackgroundResponseParser.web"),
		// 	instance_key: "backgroundAPIResponseParser",
		// 	options: {
		// 		coreBridge_instance: initialContext.monero_utils // the same as coreBridge_instance
		// 	}
		// },
		// {
		// 	module: require("../../HostedMoneroAPIClient/HostedMoneroAPIClient.Lite"),
		// 	instance_key: "hostedMoneroAPIClient",
		// 	options: {
		// 		appUserAgent_product: app.getName(),
		// 		appUserAgent_version: app.getVersion(),
		// 		request_conformant_module: require('xhr') 
		// 	}
		// },
		{
			module: backgroundAPIResponseParser,
			instance_key: "backgroundAPIResponseParser",
			options: {
				coreBridge_instance: initialContext.monero_utils // the same as coreBridge_instance
			}
		},
		{
			module: HostedMoneroAPIClient,
			instance_key: "hostedMoneroAPIClient",
			options: {
				appUserAgent_product: app.getName(),
				appUserAgent_version: app.getVersion(),
				request_conformant_module: require('xhr') 
			}
		},
		{
			module: OpenAlias,
			instance_key: "openAliasResolver",
			options: {
				txtRecordResolver: txtRecordResolver
			}
		},
		{
			module: Theme,
			instance_key: "themeController",
			options: {}
		},
		//
		// app controllers
		{
			module: Passwords,
			instance_key: "passwordController",
			options: {}
		},
		{
			module: Settings,
			instance_key: "settingsController",
			options: {}
		},
		{
			module: ContactsListController,
			instance_key: "contactsListController",
			options: {
			}
		},
		{
			module: UserIdle,
			instance_key: "userIdleInWindowController",
			options: {}
		},
		// The following should go after the passwordController, persister, etc
		{
			module: WalletsList,
			instance_key: "walletsListController",
			options: {}
		},
		{
			module: WalletAppCoordinator,
			instance_key: "walletAppCoordinator",
			options: {}
		},
		{
			module: FundsRequestsListController,
			instance_key: "fundsRequestsListController",
			options: {
			}
		},
		{
			module: exceptionAlerting, 
			instance_key: "exceptionAlerting",
			options: {}
		}
	]	
	//
	// return runtimeContext.NewHydratedContext(
	// 	context_object_instantiation_descriptions, 
	// 	initialContext
	// )
	//console.log(runtimeContext);

	//
	return rcNewHydratedContext(
		context_object_instantiation_descriptions, 
		initialContext
	)
}

function rcNewHydratedContext(context_object_instantiation_descriptions, initialContext_orNilForNew) {
	//console.log("runtime_context inside index_context -- NewHydratedContext")
	//console.log(context_object_instantiation_descriptions)
	//console.log(initialContext_orNilForNew)
	var context = initialContext_orNilForNew != null ? initialContext_orNilForNew : {}
	for (let i in context_object_instantiation_descriptions) {
		var description = context_object_instantiation_descriptions[i]
		let module_path = description.module_path
		let description_module = description.module
		if (module_path && typeof module_path !== 'string') {
			console.error("Invalid description.module_path: ", JSON.stringify(description, null, '  '))
			throw "runtime_context found invalid description 'module_path' key value type"
		}
		if (description_module && typeof description_module === 'string') {
			console.error("Invalid description.module: ", JSON.stringify(description, null, '  '))
			throw "runtime_context found invalid description 'module' key value type"
		}
		var module = description_module || require("" + module_path)
		if (typeof module === 'undefined' || module === null) {
			console.error("Unable to require " + description.module_path + ". Skipping.")
			continue
		}
		var instance;
		if (i != 8){
			try {
				instance = new module(description.options, context)
			} catch (e) {
				console.error("Code fault while loading ", JSON.stringify(description, null, '  '))
				throw e
			}
			if (typeof instance === 'undefined' || instance === null) {
				console.error("Unable to create an instance of " + description.module_path + ". Skipping.")
				throw "runtime_context: Unable to create an instance"
			}
			context[description.instance_key] = instance
			//
			const aliases = description.aliases || []
			for (var idx in aliases) {
				const alias = aliases[idx]
				context[alias] = instance
			}
		} else if (i == 8) {
			// TODO: Remove this -- code is here for debugging BackgroundAPIResponseParser
			try {
				//console.log("Debugging backgroundResponseParser")
				//console.log(i)
				//console.log(context_object_instantiation_descriptions);
				//console.log(description);
		
				//console.log(module)
				//console.log(typeof module)		
				//console.log(description.options)
				//console.log(context)
				instance = new module(description.options, context)
				//console.log("We successfully instantiated backgroundResponseParser");
			} catch (e) {
				console.error("Code fault while loading ", JSON.stringify(description, null, '  '))
				throw e
			}
			if (typeof instance === 'undefined' || instance === null) {
				console.error("Unable to create an instance of " + description.module_path + ". Skipping.")
				throw "runtime_context: Unable to create an instance"
			}
			context[description.instance_key] = instance
			//
			const aliases = description.aliases || []
			for (var idx in aliases) {
				const alias = aliases[idx]
				context[alias] = instance
			}
		}
	}
	var context_keys = Object.keys(context)
	for (let i in context_keys) {
		var context_key = context_keys[i]
		let instance = context[context_key]
		// This calls an optional function that classes can implement to get control after the whole context is set up
		var postWholeContextInit_setup__fn = instance.RuntimeContext_postWholeContextInit_setup
		if (typeof postWholeContextInit_setup__fn !== 'undefined') {
			postWholeContextInit_setup__fn.call(instance) // using 'call' so the function's "this" is instance
		}
	}
	
	return context
}

let obj = {
	NewHydratedContext
}

export default obj;