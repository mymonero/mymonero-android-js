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
		SecureStoragePlugin.keys().then(keys => {
			console.log("Existing keys:");
			console.log(keys);
		})
		console.log("SecureStorage: invoked __allDocuments");
		console.log(collectionName);
		let parameters = { collectionName, fn }
		// get collectionName object -- that's our index
		SecureStoragePlugin.get({ key: collectionName }).then((returnData) => {
			let jsonString = returnData.value;
			let obj = JSON.parse(jsonString);
			console.log("This is what we have for " + parameters.collectionName);
			console.log(obj);
			let strings = [];	

			let promiseArr = [];
			// since we could get multiple ids back, we need to create a number of promises and return the values of them
			for (let i = 0; i < obj.length; i++) {
				console.log(`Promise ${i}`);
				console.log(obj);
				console.log(obj[0]);
				let retrievalObj = {
					key: collectionName + obj[i]
				}

				console.log(retrievalObj);

				promiseArr[i] = SecureStoragePlugin.get(retrievalObj).catch(error => {
					console.log("There was a problem with promise number");
					console.log(i);
					console.log(error);
					// let's get keys and output them
					let keys = SecureStoragePlugin.keys().then(keys => {
						console.log("Promise problem: keys");
						console.log(keys);
					});
				})
			}



			Promise.all(promiseArr).then((values) => {
				console.log("Here are the allDocument values ");
				var documentCollectionArr = [];
				for (let j = 0; j < values.length; j++) {
					let returnedObj = JSON.parse(values[j].value);
					console.log(`returnedObj for ${j}`)
					console.log(returnedObj);
					documentCollectionArr.push(returnedObj);
				}
				console.log(values);
				setTimeout(function() { // maintain async
					fn(null, documentCollectionArr)
				})
			}).catch(error => {
				console.log("There was a problem retrieveing allDocument values ");
				console.log(error);
			});

			console.log("Originally returned this: ");
			// const collectionStringsById = self.store[collectionName] || {}
			// const ids = Object.keys(collectionStringsById)
			// const ids_length = ids.length
			
			// for (var i = 0 ; i < ids_length ; i++) {
			// 	const id = ids[i]
			// 	const stringWithId = collectionStringsById[id] || null
			// 	strings.push(stringWithId)
			// }
			// console.log(strings)
			

		}).catch((error) => {
			console.log(`Catch error on allDocuments for ${parameters.collectionName}`);
			console.log(error);
			let strings = [];	
			setTimeout(function() { // maintain async
				fn(null, strings)
			})
		})

		// const self = this;
		// try {
		// 	let options = {
		// 		key: collectionName
		// 	}
		// 	SecureStoragePlugin.get(options).then((returnData) => {
		// 		console.log(`Retrieved data for ${collectionName}`);
		// 		console.log(returnData);
		// 		const strings = []
		// 		const returnArray = []
		// 		let dataObj = JSON.parse(returnData.value);


		// 		//console.log(dataObj);
		// 		fn(null, returnData);
		// 		return;
		// 	}).catch(error => {
		// 		console.log(`No data for key ${collectionName}`);
		// 		console.log(error);
		// 		fn(null, []);
		// 	});
		// } catch (e) {
		// 	console.log("Error: Could not access SecureStorage for some reason");
		// 	console.log(e);
		// }
		// let rootObj = SecureStoragePlugin.get({ key: "DataStore"}).then((rootObject) => {
		// 	console.log("Root object looks like this:");
		// 	console.log(rootObject);

		// 	setTimeout(function() { // maintain async
		// 		fn(null, [])
		// 	})
		// }).catch(() => {
		// 	let strings = [];	
		// 	setTimeout(function() { // maintain async
		// 		fn(null, strings)
		// 	})
		// });

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
		let rootObject = SecureStoragePlugin.get({ key: collectionName }).then((returnData) => {
			
			console.log("This document set has an index saved");
			console.log(returnData);

			// this code exists for debug -- we want to hop to catch expression
			console.log("this code exists for debug -- we want to hop to catch expression");
			console.log(nonExistant);


			// if (keys.length == 0) {
			// 	let documents = [];
			// 	fn(null, documents);
			// }

			// // insert into index, then save object with appropriate ID
			// let rootObjData = returnData.value;
			// console.log("Root obj")
			// console.log(rootObjData);


			// let dataObj = {
			// 	_id: id,
			// 	data: documentToInsert
			// }
			// documents.push(dataObj);

			// let data = {
			// 	key: collectionName,
			// 	value: documents
			// }

			// console.log(JSON.stringify(data))

			// SecureStoragePlugin.set(data).then(() => {
			// 	console.log("Saved document successfully");
			// 	fn(null, documentToInsert)
			// })
	
			// setTimeout(function() {
			// 	fn(null, documentToInsert)
			// })
		}).catch(() => {
			console.log("No root object, create one");
			let rootObject = {};
			rootObject[collectionName] = [];
			console.log(rootObject);
			console.log(collectionName);
			console.log(documentToInsert);
			
			// Since the legacy code is horrendous, we don't know if we've been passed a string or an object 
			let stringContents = "";
			if (typeof documentToInsert === 'string') {
				stringContents = documentToInsert
			} else {
				try {
					stringContents = JSON.stringify(documentToInsert)
				} catch (e) {
					fn(e)
					return
				}
				if (!stringContents || typeof stringContents === 'undefined') { // just to be careful
					fn(new Error("Unable to stringify document for write."))
					return
				}
			}

			// Promise to create collectionName index file
			
			let collectionObj = [];
			collectionObj.push(id);
			console.log("We would create an index with this obj");
			console.log(collectionObj);
			let indexPromise = SecureStoragePlugin.set({ key: collectionName, value: JSON.stringify(collectionObj) }).then(() =>  {
			 	console.log("Saved successfully");
			})

			// Promise to create object using its id as a key

			let saveObj = {
				id: id,
				value: stringContents
			}

			let saveObjString = JSON.stringify(saveObj);

			let objectKey = collectionName + id;

			let objectPromise = SecureStoragePlugin.set({ key: objectKey, value: saveObjString }).then(() =>  {
				console.log("Saved successfully");
		   	})

			console.log("We would create an object using this object and key");
			console.log(collectionObj);
			console.log(saveObj)
			
			let promises = [indexPromise, objectPromise];

			Promise.all(promises).then(values => {
				console.log(values);
				console.log("Object saved successfully");
				setTimeout(function() {
					fn(null, documentToInsert)
				})
			}).catch(error => {
				console.log("There was an error saving the object");
				console.log(error);
			})

			// rootObject[collectionName].push(saveObj);
			// console.log(rootObject);
			// SecureStoragePlugin.set({ key: "DataStore", value: JSON.stringify(rootObject) }).then(() =>  {
			// 	console.log("Saved successfully");
			// })
		})
	}

	// We keep distinct files per collection type, which have an array of ids. 
	// These ids in the array then refer to a distinct object in the format of: ${collectionName}${id} -- eg Walletn2342klsx-e3kmdef-23mkdsf, Settings233ne-befed-21343, etc
	getRootObj(collectionName) {
		console.log(`Trying to get root object for ${collectionName}`);
		let rootObject = SecureStoragePlugin.get({ key: collectionName }).then((returnData) => {
			console.log("Root object");
			let rootObj = JSON.parse(returnData.value);
			console.log(rootObj);
		}).catch(() => {
			console.log("No root object exists yet");
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

		setTimeout(function() {
			fn(null, updateString)
		})
		
		// const self = this
		// const fileDescription = self._new_fileDescriptionWithComponents(
		// 	collectionName,
		// 	id
		// )
		// self.___write_fileDescriptionDocumentContentString(fileDescription, update, fn)

		// const self = this
		// const collectionStringsById = self.___lazy_writable_collectionStringsById(collectionName)
		// collectionStringsById[id] = updateString
		
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
	// This only removes a specific collection's objects
	__removeAllCollectionDocuments(collectionName, fn)
	{
		console.log("SecureStorage: invoked __removeAllDocuments");
		const self = this
		const numberOfDocuments = Object.keys(self.store[collectionName] || {}).length
		self.store[collectionName] = {}
		setTimeout(function() {
			fn(null, numberOfDocuments)
		})
	}
	// This completely removes all objects saved
	__removeAllData(fn)
	{
		console.log("SecureStorage: invoked __removeAllData");
		SecureStoragePlugin.clear().then(() => {
			fn(error, "SecureStorage: __removeAllData successful");
		}).catch(error => {
			console.log("SecureStorage: Invoke removeAllData failed")
			console.log(error);
			fn(error, null);
		});
	}
}
export default DocumentPersister;