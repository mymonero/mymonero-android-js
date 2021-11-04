"use strict"

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
import backgroundAPIResponseParser from "@mymonero/mymonero-response-parser-utils";
import HostedMoneroAPIClient from "@mymonero/mymonero-hosted-api"; 
import OpenAlias from "../../OpenAlias/OpenAliasResolver";
import Theme from "../../Theme/ThemeController";
import FundsRequestsListController from "../../RequestFunds/Controllers/FundsRequestsListController"
import Passwords from "../../Passwords/Controllers/PasswordController.Full";
import Settings from "../../Settings/Controllers/SettingsController";
import UserIdle from "../../UserIdle/UserIdleInWindowController";
import WalletsList from "../../WalletsList/Controllers/WalletsListController.Full";
import WalletAppCoordinator from "../../WalletAppCoordinator/WalletAppCoordinator";
import exceptionAlerting from "../Controllers/ExceptionAlerting.browser.web.js"

const txtRecordResolver = new TXTRecordResolver({})
function NewHydratedContext(initialContext)
{
	initialContext = initialContext || {}

	const context = initialContext != null ? initialContext : {}

	context.pasteboard = new Pasteboard({}, context)
	context.urlBrowser = new URLBrowser({}, context)
	context.filesystemUI = new FilesystemUI({}, context)
	context.windowDialogs = new WindowDialogs({}, context)
	context.CcyConversionRates_Controller_shared = new CcyConversionRates({}, context)
	context.locale  = new Locale({}, context)
	context.string_cryptor__background = new symmetric_cryptor({}, context)
	context.persister = new DocumentPersister({}, context)
	context.backgroundAPIResponseParser = new backgroundAPIResponseParser({
		coreBridge_instance: initialContext.monero_utils // the same as coreBridge_instance
	}, context)
	context.hostedMoneroAPIClient = new HostedMoneroAPIClient({
		appUserAgent_product: initialContext.name,
		appUserAgent_version: initialContext.version,
		apiUrl: initialContext.apiUrl,
		request_conformant_module: require('xhr') 
	}, context)
	context.openAliasResolver = new OpenAlias({
		txtRecordResolver: txtRecordResolver
	}, context)
	context.themeController = new Theme({}, context)
	context.passwordController = new Passwords({}, context)
	context.settingsController = new Settings({}, context)
	context.contactsListController = new ContactsListController({}, context)
	context.userIdleInWindowController = new UserIdle({}, context)
	context.walletsListController = new WalletsList({}, context)
	context.walletAppCoordinator = new WalletAppCoordinator({}, context)
	context.fundsRequestsListController = new FundsRequestsListController({}, context)
	context.exceptionAlerting = new exceptionAlerting({}, context)

	const contextKeys = Object.keys(context)
  for (const i in contextKeys) {
    const contextKey = contextKeys[i]
    const instance = context[contextKey]
    // This calls an optional function that classes can implement to get control after the whole context is set up
    const postWholeContextInit_setup__fn = instance.RuntimeContext_postWholeContextInit_setup
    if (typeof postWholeContextInit_setup__fn !== 'undefined') {
      postWholeContextInit_setup__fn.call(instance) // using 'call' so the function's "this" is instance
    }
  }

	return context
}

let obj = {
	NewHydratedContext
}

export default obj
