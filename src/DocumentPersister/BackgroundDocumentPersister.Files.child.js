'use strict'

console.log('BackgroundDocumentPersister.Files.child.js imported')
import child_ipc from '../Concurrency/ipc.electron.child'
//
const databaseFileParentDirectory = process.argv[2]
if (typeof databaseFileParentDirectory === 'undefined' || !databaseFileParentDirectory) {
  throw 'BackgroundDocumentPersister.Files.child.js requires argv[2] databaseFileParentDirectory'
}
const reporting_appVersion = process.argv[3]
if (typeof reporting_appVersion === 'undefined' || !reporting_appVersion) {
  throw 'BackgroundDocumentPersister.Files.child.js requires argv[3] reporting_appVersion'
}

//
import DocumentPersister_Files from './DocumentPersister.Files'

import fs from 'fs'
const options =
{
  userDataAbsoluteFilepath: databaseFileParentDirectory,
  fs
}
const persister = new DocumentPersister_Files(options)
//
//
// Declaring tasks:
//
const tasksByName =
{
  DocumentsWithIds: function (
    taskUUID, // child_ipc inserts the task UUID so we have it
    collectionName,
    ids
  ) {
    // console.time("DocumentsWithIds " + taskUUID)
    persister.DocumentsWithIds(
      collectionName,
      ids,
      function (err, docs) {
        // console.timeEnd("DocumentsWithIds " + taskUUID)
        child_ipc.CallBack(taskUUID, err, docs)
      }
    )
  },
  IdsOfAllDocuments: function (
    taskUUID, // child_ipc inserts the task UUID so we have it
    collectionName
  ) {
    // console.time("IdsOfAllDocuments " + taskUUID)
    persister.IdsOfAllDocuments(
      collectionName,
      function (err, ids) {
        // console.timeEnd("IdsOfAllDocuments " + taskUUID)
        child_ipc.CallBack(taskUUID, err, ids)
      }
    )
  },
  AllDocuments: function (
    taskUUID, // child_ipc inserts the task UUID so we have it
    collectionName
  ) {
    // console.time("AllDocuments " + taskUUID)
    persister.AllDocuments(
      collectionName,
      function (err, docs) {
        // console.timeEnd("AllDocuments " + taskUUID)
        child_ipc.CallBack(taskUUID, err, docs)
      }
    )
  },
  InsertDocument: function (
    taskUUID, // child_ipc inserts the task UUID so we have it
    collectionName,
    id,
    savableDocument
  ) {
    // console.time("InsertDocument " + taskUUID)
    persister.InsertDocument(
      collectionName,
      id,
      savableDocument,
      function (err, newDocument) {
        // console.timeEnd("InsertDocument " + taskUUID)
        child_ipc.CallBack(taskUUID, err, newDocument)
      }
    )
  },
  UpdateDocumentWithId: function (
    taskUUID, // child_ipc inserts the task UUID so we have it
    collectionName,
    id,
    update
  ) {
    // console.time("UpdateDocuments " + taskUUID)
    persister.UpdateDocumentWithId(
      collectionName,
      id,
      update,
      function (err, numAffected) {
        // console.timeEnd("UpdateDocuments " + taskUUID)
        const returnValuesByKey =
				{
				  numAffected: numAffected
				}
        child_ipc.CallBack(taskUUID, err, returnValuesByKey)
      }
    )
  },
  RemoveDocumentsWithIds: function (
    taskUUID, // child_ipc inserts the task UUID so we have it
    collectionName,
    ids,
    options
  ) {
    // console.time("RemoveDocuments " + taskUUID)
    persister.RemoveDocumentsWithIds(
      collectionName,
      ids,
      function (err, numRemoved) {
        // console.timeEnd("RemoveDocuments " + taskUUID)
        child_ipc.CallBack(taskUUID, err, numRemoved)
      }
    )
  },
  RemoveAllDocuments: function (
    taskUUID, // child_ipc inserts the task UUID so we have it
    collectionName,
    options
  ) {
    // console.time("RemoveDocuments " + taskUUID)
    persister.RemoveAllDocuments(
      collectionName,
      function (err) {
        // console.timeEnd("RemoveDocuments " + taskUUID)
        child_ipc.CallBack(taskUUID, err)
      }
    )
  }
}
//
//
// Kicking off runtime:
//
child_ipc.InitWithTasks_AndStartListening(tasksByName, 'BackgroundDocumentPersister.Files.child', reporting_appVersion)
