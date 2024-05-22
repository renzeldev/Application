import json
from flask_restful import Resource
from ..database.Models.capability import Capability as capability

class Name(Resource):
    """
    Class that handles a get request for checking if
    a capability name is already in use in the system
    callable from the route /capability/name/:name
    where :name is the name of the capability to check for
    """
    method_decorators = {'get': []}
    def get(self, name):
        try:
            self.capability = capability.objects.get(name=name)
            return {'exists': True}, 200
        except capability.DoesNotExist:
            return {'exists': False}, 200
