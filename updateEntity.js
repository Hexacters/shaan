'use strict';

const dialogflow = require('dialogflow');
const credentials = require('./fine-98f2b-89eda055283f.json');
const entitiesClient = new dialogflow.EntityTypesClient({
 credentials: credentials,
});
const projectId = 'fine-98f2b';
const agentPath = entitiesClient.projectAgentPath(projectId);
class EntityNotFoundError extends Error {};

function addUserEntity(name) {

	return entitiesClient.listEntityTypes({parent: agentPath}).then((responses) => {
      const resources = responses[0];
      for (let i = 0; i < resources.length; i++) {
        const entity = resources[i];
        if (entity.displayName === 'Users') {
          return entity;
        }
      }
      throw new EntityNotFoundError();
    })
    .then((users) => {
      for (let i = 0; i < users.entities.length; i++) {
        const entity = users.entities[i];
        if (entity.value == name) {
        	console.log(name);
          throw new EntityNotFoundError();
        }
      }
      var updatedEntityList = {value: name, synonyms: [name, name.toUpperCase(), name.toLowerCase()]}
      users.entities.push(updatedEntityList);
      const request = {
        entityType: users,
        updateMask: {
          paths: ['entities'],
        },
      };
      return entitiesClient.updateEntityType(request);
    })
    .then((responses) => {
     	return name + 'was added to our group';
    })
    .catch((err) => {
      if (err instanceof EntityNotFoundError) {
        return name + 'was Already in my Database';
      }
      console.error('Error updating entity type:', err);
    });

}

module.exports = addUserEntity;
