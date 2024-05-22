import json
from datetime import datetime
from flask import Response, request
from flask_restful import Resource
from mongoengine.errors import InvalidQueryError, ValidationError, NotUniqueError, OperationError
from mongoengine.queryset.visitor import Q
from ..database.Models.capability import Capability as capability
from ..helpers.parser import parseQuery, filterFields
from ..helpers.verify import verifyHeaders
from ..helpers.util import fixId

from urllib import parse

class Capability(Resource):
    """
    Class that handles the basic routing of the endpoints
    GET /capability
    POST /capability
    """
    method_decorators = {'post': [verifyHeaders], 'get': []}
    def get(self):
        try:
            query, fields, sf, lim = parseQuery(request.query_string)

            capabilities = capability.objects(Q(**query)).order_by(sf).limit(lim)
            res = [json.loads(cap.to_json()) for cap in capabilities]
            res = filterFields(res, fields) if fields is not None else res
            res = fixId(res)

            return res, 200
        except InvalidQueryError as e:
            return {'status': 400, 'reason': str(e)}, 400
    def post(self):
        try:
            body = request.get_json()
            self.capability = capability(**body).save()
            self.capability = json.loads(self.capability.to_json())
            self.capability = fixId(self.capability)
            return self.capability, 201
        except ValidationError as e:
            return {'status': 400, 'reason': str(e), 'fields': list(e.to_dict().keys())}, 400
        except NotUniqueError as e:
            return {'status': 400, 'reason': 'Name: ' + body['name'] + ' already exists. Property name must be unique'}, 400
class Capability_id(Resource):
    """
    Class that handles the endpoints related to a single capability
    GET /capability/:id
    PATCH /capability/:id
    DELETE /capability/:id

    where :id is the id under _id -> $oid in the database
    """
    method_decorators = {'patch': [verifyHeaders, ], 'get': [], 'delete': []}
    def get(self, id):
        try:
            _, fields, _, _ = parseQuery(request.query_string)
            self.capability = capability.objects.get(id=id)
            res = json.loads(self.capability.to_json())
            res = filterFields(res, fields) if fields is not None else res
            res = fixId(res)
            return res, 200
        except capability.DoesNotExist as e:
            return {'status': 404, 'reason': str(e)}, 404
        except ValidationError as e:
            return {'status': 400, 'reason': str(e), 'fields': list(e.to_dict().keys())}, 400

    def patch(self, id):
        try:
            body = request.get_json()
            #body['updated'] = datetime.utcnow
            capability.objects.get(_id=id).update(**body)
            self.capability = capability.objects.get(_id=id)
            res = json.loads(self.capability.to_json())
            res = fixId(res)
            return res, 201
        except capability.DoesNotExist as e:
            return {'status': 404, 'reason': str(e)}, 404
        except OperationError as e:
            return {'status': 500, 'reason': str(e)}, 500
        except ValidationError as e:
            print(e)
            return {'status': 400, 'reason': str(e), 'fields': list(e.to_dict().keys())}, 400

    def delete(self, id):
        try:
            self.capability = capability.objects.get(id=id)
            capData = json.loads(self.capability.to_json())
            if 'deleted' in capData:
                self.capability.delete()
                return [], 204
            else:
                updateData = {'deleted': datetime.utcnow}
                self.capability.update(**updateData)
                self.capability = capability.objects.get(id=id)
                res = json.loads(self.capability.to_json())
                res = fixId(res)
                return res, 201
        except capability.DoesNotExist as e:
            return {'status': 404, 'reason': str(e)}, 404
        except ValidationError as e:
            return {'status': 400, 'reason': str(e), 'fields': list(e.to_dict().keys())}, 400

class Capability_undo(Resource):
    """
    Set of routes for supporting the undoing of eg. a delete
    DELETE /capability/undo/:id
    """
    def delete(self, id):
        try:
            self.capability = capability.objects.get(id=id)
            capData = json.loads(self.capability.to_json())
            if 'deleted' in capData:
                capData.pop('deleted', 'None')
                self.capability.update(unset__deleted=True)
                self.capability = capability.objects.get(id=id)
                res = json.loads(self.capability.to_json())
                res = fixId(res)
                return res, 201
            else:
                return {'status': 400, 'reason': 'can\'t revert the deletion of a non softdelted capability'}, 400
        except capability.DoesNotExist as e:
            return {'status': 404, 'reason': str(e)}, 404
