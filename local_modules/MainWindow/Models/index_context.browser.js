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
import URLBrowser from"../../URLBrowser/URLBrowser.browser";
import FilesystemUI from"../../FilesystemUI/FilesystemUI.browser";
import WindowDialogs from"../../WindowDialogs/WindowDialogs.browser";
import CcyConversionRates from"../../CcyConversionRates/Controller";
import Locale from"../../Locale/Locale.browser";
import symmetric_cryptor from"../../symmetric_cryptor/BackgroundStringCryptor.noOp";
import DocumentPersister from"../../DocumentPersister/DocumentPersister.SecureStorage";
//import HostedMoneroAPIClient from"../../HostedMoneroAPIClient/BackgroundResponseParser.web";
import HostedMoneroAPIClient from"../../HostedMoneroAPIClient/HostedMoneroAPIClient.Lite";
import OpenAlias from"../../OpenAlias/OpenAliasResolver";
import Theme from"../../Theme/ThemeController";
import Passwords from"../../Passwords/Controllers/PasswordController.Lite";
import Settings from"../../Settings/Controllers/SettingsController";
import UserIdle from"../../UserIdle/UserIdleInWindowController";
import WalletsList from"../../WalletsList/Controllers/WalletsListController.Lite";
import WalletAppCoordinator from"../../WalletAppCoordinator/WalletAppCoordinator";
import runtimeContext from "../../runtime_context/runtime_context";

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
		{
			module: HostedMoneroAPIClient,
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
			module: require("../Controllers/ExceptionAlerting.browser.web.js"),
			instance_key: "exceptionAlerting",
			options: {}
		}
	]	
	//
	// return runtimeContext.NewHydratedContext(
	// 	context_object_instantiation_descriptions, 
	// 	initialContext
	// )
	console.log(runtimeContext);
	
}
export { NewHydratedContext };