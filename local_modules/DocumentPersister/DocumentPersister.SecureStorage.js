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
//"use strict"
//
//const async = require('async')
//
//
import 'capacitor-secure-storage-plugin';
import { Plugins } from '@capacitor/core';
const { SecureStoragePlugin } = Plugins; // Initialises the Secure Storage Capacitor plugin
console.log(SecureStoragePlugin);

import DocumentPersister_Interface from './DocumentPersister_Interface';
//
class DocumentPersister extends DocumentPersister_Interface
{
	constructor(options)
	{
		super(options) // must call on super before accessing options
		//
		const self = this
		options = self.options
		//
		self.store = {}
	}
	//
	// Runtime - InMemory - Accessors
	___lazy_writable_collectionStringsById(collectionName)
	{
		console.log("SecureStorage: invoked ___lazy_writable_collectionStringsById");
		const self = this
		var collectionStringsById = self.store[collectionName] || null
		if (typeof collectionStringsById == 'undefined' || !collectionStringsById) {
			collectionStringsById = {}
			self.store[collectionName] = collectionStringsById
		}
		if (typeof collectionStringsById == 'undefined' || !collectionStringsById) {
			throw "expected non-nil collectionStringsById"
		}
		return collectionStringsById
	}
	//
	//
	// Runtime - Accessors - Interface - Overrides
	//
	__documentContentStringsWithIds(collectionName, ids, fn)
	{
		console.log("SecureStorage: invoked __documentContentStringsWithIds");
		const self = this
		const collectionStringsById = self.store[collectionName] || {}
		const ids_length = ids.length
		const stringsWithIds = []
		for (var i = 0 ; i < ids_length ; i++) {
			const id = ids[i]
			const stringWithId = collectionStringsById[id] || null
			if (stringWithId != null) {
				stringsWithIds.push(stringWithId)
			}
		}
		setTimeout(function() { // maintain async
			fn(null, stringsWithIds)
		})
	}
	__idsOfAllDocuments(collectionName, fn)
	{
		console.log("SecureStorage: invoked __idsOfAllDocuments");
		const self = this
		const collectionStringsById = self.store[collectionName] || {}
		const ids = Object.keys(collectionStringsById)
		setTimeout(function() { // maintain async
			fn(null, ids)
		})
	}
	__allDocuments(collectionName, fn)
	{
		console.log("SecureStorage: invoked __allDocuments");
		console.log(collectionName);
		const self = this
		const collectionStringsById = self.store[collectionName] || {}
		const ids = Object.keys(collectionStringsById)
		const ids_length = ids.length
		const strings = []
		for (var i = 0 ; i < ids_length ; i++) {
			const id = ids[i]
			const stringWithId = collectionStringsById[id] || null
			strings.push(stringWithId)
		}
		console.log(strings)
		setTimeout(function() { // maintain async
			fn(null, strings)
		})
	}
	_new_fileDescriptionWithComponents(collectionName, _id)
	{
		console.log("SecureStorage: invoked _new_fileDescriptionWithComponents");
		console.log(collectionName);
		console.log(_id);
		return {
			_id: _id,
			collectionName: collectionName
		}
	}
	//
	//
	// Runtime - Imperatives - Interface - Overrides
	//
	__insertDocument(collectionName, id, documentToInsert, fn)
	{
		console.log("SecureStorage: invoked __insertDocument");
		const self = this
		console.log("collectionName")
		console.log(collectionName)
		console.log("id")
		console.log(id)
		console.log(documentToInsert)
		console.log(documentToInsert)
		const collectionStringsById = self.___lazy_writable_collectionStringsById(collectionName)
		collectionStringsById[id] = documentToInsert
		console.log(collectionStringsById)
		// Ensure document doesn't exist before we write it
		let keyExists = false;
		console.log("Check keys");
		let keys = SecureStoragePlugin.keys().then((keys) => {
			console.log(keys)
			if (keys.value.length > 0) {
				console.log("The key exists, abort");
				fn("Attempt to insert document for key that exists", null)
				return;
			}
	
			let data = {
				key: collectionName,
				value: documentToInsert
			}
			SecureStoragePlugin.set(data).then(() => {
				console.log("Saved document successfully");
				fn(null, documentToInsert)
			})
	
			// setTimeout(function() {
			// 	fn(null, documentToInsert)
			// })
		})
	}
/**
 * 
 * Methods
		get(options: { key: string }): Promise<{ value: string }>
		if item with specified key does not exist, throws an Error
		keys(): Promise<{ value: string[] }>
		set(options: { key: string; value: string }): Promise<{ value: boolean }>
		remove(options: { key: string }): Promise<{ value: boolean }>
		clear(): Promise<{ value: boolean }>
		set, remove and clear return true in case of success and false in case of error
		getPlatform(): Promise<{ value: string }>
		returns which implementation is used - one of 'web', 'ios' or 'android'

*/
		// Safe to write
		
	
	__updateDocumentWithId(collectionName, id, updateString, fn)
	{
		console.log("SecureStorage: invoked __updateDocumentWithId");

		console.log(collectionName)
		console.log(id)
		console.log(updateString)

		const self = this
		const fileDescription = self._new_fileDescriptionWithComponents(
			collectionName,
			id
		)
		self.___write_fileDescriptionDocumentContentString(fileDescription, update, fn)

		// const self = this
		// const collectionStringsById = self.___lazy_writable_collectionStringsById(collectionName)
		// collectionStringsById[id] = updateString
		// setTimeout(function() {
		// 	fn(null, updateString)
		// })
	}
	__removeDocumentsWithIds(collectionName, idsToRemove, fn)
	{ 
		console.log("SecureStorage: invoked __removeDocumentsWithIds");
		const self = this
		const collectionStringsById = self.store[collectionName] || {}
		var numRemoved = 0
		const idsToRemove_length = idsToRemove.length
		for (var i = 0 ; i < idsToRemove_length ; i++) {
			const id = idsToRemove[i]
			const valueExistsAtId = (collectionStringsById[id] || null) != null
			if (valueExistsAtId) {
				delete self.store[collectionName][id]
				numRemoved += 1
			}
		}
		setTimeout(function() {
			fn(null, numRemoved)
		})
	}
	__removeAllDocuments(collectionName, fn)
	{
		console.log("SecureStorage: invoked __removeAllDocuments");
		const self = this
		const numberOfDocuments = Object.keys(self.store[collectionName] || {}).length
		self.store[collectionName] = {}
		setTimeout(function() {
			fn(null, numberOfDocuments)
		})
	}
}
export default DocumentPersister;